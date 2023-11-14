
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { Employe } from "../entity/employe";
import { createMenuObject } from "../helpers/CreatemenuObject";

export const search = async (req: Request, res: Response) => {
    let query: string = req.query.q as string;

    const employeeRepository = getRepository(Employe); 

    try {
        const employees = await employeeRepository.find({
            where: {
                name: Like(`%${query}%`),
            },
        });

        console.log(employees)
        
        if (!query) {
            res.redirect("/");
            return;
        }

        res.render("pages/search", {
            menu: createMenuObject(""),
            employees,
            query,
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar funcionários" });
    }
};

