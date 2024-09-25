import { Request,Response } from "express";
import { Pet } from "../models/pet";
import { createMenuObject } from "../helpers/CreateMenuObject";

export const search = (req:Request,res:Response)=> {
    let query:string = req.query.q as string;

    let list =Pet.getfromName(query)
    
    if(!query){
        res.redirect('/')
        return;
    }
    res.render('pages/page',{
        menu:createMenuObject(''),
        list,
        query
    })
}

export default search;



