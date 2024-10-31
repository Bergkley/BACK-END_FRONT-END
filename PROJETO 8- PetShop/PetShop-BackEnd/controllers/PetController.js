const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const Pet = require("../models/Pet");
const { uploadImageToFirebase } = require("../helpers/image.upload");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async create(req, res) {
    const { name, age, description, weight, breed, color,animal } = req.body;
    const images = req.files;

    const available = true;
    // images upload

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!breed) {
      res.status(422).json({ message: "A raça é obrigatório!" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    }
    if (!description) {
      res.status(422).json({ message: "A descrição é obrigatório!" });
      return;
    }
    if (!animal) {
      res.status(422).json({ message: "O pet é obrigatório!" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    }
    if (!images.lenght === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    //   get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a Pet

    const pet = new Pet({
      name,
      age,
      description,
      weight,
      breed,
      color,
      animal,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        phone: user.phone,
      },
    });
    const imageUploadPromises = images.map((image) =>
      uploadImageToFirebase(req, image)
    );

    try {
      const imagesUrls = await Promise.all(imageUploadPromises);
      pet.images.push(...imagesUrls);

      const newPet = await pet.save();
      res.status(201).json({ message: "Pet criado com sucesso!", pet: newPet });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");
    res.status(200).json({ message: "Pets encontrados com sucesso!", pets });
  }

  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");
    res.status(200).json({ message: "Pets encontrados com sucesso!", pets });
  }

  static async getAllUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");
    res.status(200).json({ message: "Pets encontrados com sucesso!", pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    res.status(200).json({ message: "Pet encontrado com sucesso!", pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //  check if logged in user is the owner of the pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação. Tente novamente mais tarde.",
      });
      return;
    }

    await Pet.findByIdAndRemove(id);

    res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    const { name, age, description, weight, breed, color,animal, available } =
      req.body;
    const images = req.files;

    const updateData = {};

    // check if pet exits

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação. Tente novamente mais tarde.",
      });
      return;
    }

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    } else {
      updateData.name = name;
    }
    if (!breed) {
      res.status(422).json({ message: "A raça é obrigatório!" });
      return;
    } else {
      updateData.breed = breed;
    }
    if (!description) {
      res.status(422).json({ message: "A descrição é obrigatório!" });
      return;
    }
    updateData.description = description;
    if (!animal) {
      res.status(422).json({ message: "O pet é obrigatório!" });
      return;
    }
    updateData.animal = animal;

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    } else {
      updateData.age = age;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    } else {
      updateData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    } else {
      updateData.color = color;
    }
    if (images && images.length > 0) {
      const imageUploadPromises = images.map((image) =>
        uploadImageToFirebase(req, image)
      );

      try {
        const imagesUrls = await Promise.all(imageUploadPromises);
        updateData.images = imagesUrls;
      } catch (error) {
        res.status(500).json({ message: error.message });
        return;
      }
    }

    await Pet.findByIdAndUpdate(id, updateData);

    res
      .status(200)
      .json({ message: "Pet atualizado com sucesso!", updateData });
  }

  static async scheduleAdoption(req, res) {
    const id = req.params.id;

    // check if pet exits

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //  check if user registered the pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma visita com seu próprio pet.",
      });
      return;
    }

    //   check if user already scheduled a visit

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res
          .status(422)
          .json({ message: "Voce ja agendou uma visita para este pet." });
        return;
      }
    }
    //  add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    }
    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} no telefone: ${pet.user.phone}`,
    });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

     // check if pet exits

     const pet = await Pet.findOne({ _id: id });

     if (!pet) {
       res.status(404).json({ message: "Pet não encontrado" });
       return;
     }

     //  check if logged in user is the owner of the pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação. Tente novamente mais tarde.",
      });
      return;
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({ message: "Parabéns! O ciclo de adoção foi finalizado com sucesso!" });
  }
};
