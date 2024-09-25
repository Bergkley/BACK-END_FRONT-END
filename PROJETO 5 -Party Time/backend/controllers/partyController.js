const PartyModel = require("../models/Party");

const checkPartyBudget = (budget,services) => {
    const PriceSum = services.reduce((sum, service) => sum + service.price, 0);

    if(PriceSum > budget) {
        return false;
    }
    return true;
}

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            if(party.services && !checkPartyBudget(party.budget, party.services)) {
                return res.status(406).json({msg: "O seu orçamento é insuficiente!"});
                
            }
            const response = await PartyModel.create(party);

            res.status(201).json({response,msg: "Festa criada com sucesso!"});
            
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();

            res.json(parties)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;

            const party = await PartyModel.findById(id);
            if(!party) {
                return res.status(404).json({msg: "Festa não encontrada!"})
            }

            res.json(party)
            
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);
            if(!party) {
                return res.status(404).json({msg: "Festa não encontrada!"})
            }

            const deleteParty = await PartyModel.findByIdAndDelete(id);
            res.status(200).json({deleteParty,msg: "Festa excluída com sucesso!"})
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            const id = req.params.id;

            if(party.services && !checkPartyBudget(party.budget, party.services)) {
                return res.status(406).json({msg: "O seu orçamento é insuficiente!"});
                
            }

            const updateParty = await PartyModel.findByIdAndUpdate(id, party);

            if(!updateParty) {
                return res.status(404).json({msg: "Festa não encontrada!"})
            }

            res.status(200).json({party,msg: "Festa atualizada com sucesso!"})
            
        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = partyController