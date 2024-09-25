const Memory = require("../models/Memory");
const fs = require("fs");

const removeOldImage = (memory) => {
  fs.unlink(`public/${memory.src}`, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Imagem removida com sucesso");
    }
  });
};

const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = `images/${req.file.filename}`;

    console.log(req.file);

    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });
    await newMemory.save();
    res.json({ msg: "Memória criada com sucesso!", newMemory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada." });
    }
    res.json(memory);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);
    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada." });
    }
    removeOldImage(memory);
    res.json({ msg: "Memória removida com sucesso." });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const updateMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    let src = null;

    if (req.file) {
      src = `images/${req.file.filename}`;
    }

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada." });
    }

    if (src) {
      removeOldImage(memory);
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (src) updateData.src = src;

    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ updatedMemory, msg: "Memória atualizada com sucesso." });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada." });
    }
    memory.favorite = !memory.favorite;

    await memory.save();

    res.json({msg: "Adicionada aos favoritos", memory});
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const addComent = async (req, res) => {
  try {

    const {name,text} = req.body;

    if(!name){
      return res.status(400).json({msg: "Por favor, preencha todos os campos."});
    }

    const coment = {name,text};

    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada." });
    }

    memory.comments.push(coment);

    await memory.save();
    res.json({msg: "Comentário adicionado com sucesso",memory});
    
  } catch (error) {
    return res.status(500).json({msg: "Server Error"});
  }
}

module.exports = {
  createMemory,
  getMemories,
  getMemory,
  deleteMemory,
  updateMemory,
  toggleFavorite,
  addComent
};
