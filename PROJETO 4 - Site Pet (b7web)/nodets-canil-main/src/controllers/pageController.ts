import { Request,Response } from "express";
import { createMenuObject } from "../helpers/CreateMenuObject";
import { Pet } from "../models/pet";

export const home = (req:Request,res:Response)=> {
    const list = Pet.getall();
    res.render("pages/page",{
        menu: createMenuObject("all"),
        banner: {
            title: "Todos os animais",
            background: "allanimals.jpg"
            
        },
        list,
    })
}

export const dogs = (req:Request,res:Response)=> {
    const list = Pet.getFromType('dog');
    res.render("pages/page",{
        menu: createMenuObject("dog"),
        banner: {
            title: "Todos os dogs",
            background: "banner_dog.jpg"
            
        },
        list,
    })
}

export const cats = (req:Request,res:Response)=> {
    const list = Pet.getFromType('cat');
    res.render("pages/page",{
        menu:createMenuObject('cat'),
        banner: {
            title: "Todos os cats",
            background: "banner_cat.jpg"
            
        },
        list,
    })
}

export const fishes = (req:Request,res:Response)=> {
    const list = Pet.getFromType('fish');
    res.render("pages/page",{
        menu:createMenuObject('fish'),
        banner: {
            title: "Todos os cats",
            background: "banner_fish.jpg"
            
        },
        list,
    })
}



export default {
    home,
    cats,
    dogs,
    fishes
};


