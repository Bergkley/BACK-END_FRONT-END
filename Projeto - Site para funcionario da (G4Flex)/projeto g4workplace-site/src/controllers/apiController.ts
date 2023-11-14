import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Employe } from '../entity/employe';
import { Sector } from '../entity/sector';
import { Subsector } from '../entity/subsector';
import bcrypt from 'bcrypt';
import { User } from '../entity/user';
import multer from 'multer'
import { createMenuObject } from '../helpers/CreatemenuObject';
import { Customer } from '../entity/customer';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import cookie from 'cookie';




dotenv.config()

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
  res.render("pages/registeruser");
};
export const forgot_password = async (req: Request, res: Response) => {
  res.render("pages/forgotpassword");
};
export const alter_password = async (req: Request, res: Response) => {
  res.render("pages/alterpassword");
};

export const login = async (req: Request, res: Response) => {
  res.render("pages/login");
};

export const registersucess = async (req: Request, res: Response) => {
    try {
      const {
        name: originalName,
        email: originalEmail,
        password,
        confirmPassword,
        securityquestion,
      } = req.body;
      
        const name = originalName.toUpperCase();
        const email = originalEmail.toLowerCase();
      
        let photo= req.file?.filename
   
        const userRepository = getRepository(User);
        const existingUser = await userRepository.findOne({where:{email:email.toLowerCase()}});
      
        if (existingUser) {
          return res.status(400).json({ error: 'O email já está cadastrado.' });
        }

        if (password !== confirmPassword) {
          return res.status(400).json({ error: 'A senha e a confirmação de senha não coincidem.' });
        }
    
        const senhaComHash = bcrypt.hashSync(password, 10);

        if(!photo || photo=='') {
          photo= 'defaultimage.png';
        }
    
        const newUser = userRepository.create({ 
            name:name,
            email:email,
            password:senhaComHash,
            photo:photo,
            security_question:securityquestion
        });
    
        await userRepository.save(newUser);
    
        return res.redirect('/login'); 
      } catch (error) {
        console.error('Erro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    res.render("pages/registeruser")
};
export const loginsucess = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          userName:user.name,
          userPhoto:user.photo

        },
        process.env.JWT_CHAVE, 
        { expiresIn: '1h' }
      );
      

      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true, 
        maxAge: 3600, 
        sameSite: 'strict', 
        secure: process.env.NODE_ENV === 'production', 
        path: '/', 
      }));

      return res.redirect('/home'); 
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const logout = (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    maxAge: 0, 
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };

  res.setHeader('Set-Cookie', cookie.serialize('token', '', cookieOptions));

  return res.redirect('/login'); 
};





export const forgot_password_sucess = async (req: Request, res: Response) => {
  try {
    const {
      email: originalEmail,
      newpassword,
      confirmnewpassword,
      securityquestion,
    } = req.body;
  
    const email = originalEmail.toLowerCase();
  
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email:email } });
  
    if (existingUser && existingUser.security_question === securityquestion && newpassword === confirmnewpassword) {
      const senhaComHash = bcrypt.hashSync(newpassword, 10);
  

      existingUser.password = senhaComHash;
      await userRepository.save(existingUser);
  
      return res.json({ message: 'Senha atualizada com sucesso.' });
    } else {
      return res.status(400).json({ error: 'Dados inválidos para atualização da senha.' });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}  
export const employee = async (req: Request, res: Response) => {
  try {
    const sectorRepository = getRepository(Sector);
    const employeeRepository = getRepository(Employe);
    const userRepository = getRepository(User);
    
    const employeandsubsector = await employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.subsectors', 'subsector')
      .leftJoinAndSelect('employee.sectors', 'sector')
      .orderBy('employee.name', 'ASC')
      .getMany();

      const cookiee= cookie.parse(req.headers.cookie)

      const token = jwt.decode(cookiee.token)

    res.render('pages/page', {
      menu: createMenuObject('Funcionarios'),
      list: employeandsubsector,
      background: 'bannerinicial.jpg',
      usertokenid:token['userId'],
      usertokenname:token["userName"],
      usertokenphoto:token["userPhoto"]
    });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};


  



export const sector = async (req: Request, res: Response) => {
  try {
    const sectorRepository = getRepository(Sector);

    const sectors = await sectorRepository.find();

    const sectores = await sectors

    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    res.render('pages/sector', {
      menu: createMenuObject('Setor'),
      list: sectors,
      background: 'bannersetor.jpg',
      usertokenid:token['userId'],
      usertokenname:token["userName"],
      usertokenphoto:token["userPhoto"]
    });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
export const customer = async (req: Request, res: Response) => {
  try {
    const customerRepository = getRepository(Customer);
    
    const customers = await customerRepository.find();

    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    res.render('pages/customer', {
      menu: createMenuObject('Clientes'),
      list: customers,
      background: 'clientes.png',
      usertokenid:token['userId'],
      usertokenname:token["userName"],
      usertokenphoto:token["userPhoto"]
    });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

export const contact = async (req: Request, res: Response) => {
  const cookiee= cookie.parse(req.headers.cookie)

  const token = jwt.decode(cookiee.token)
  
  res.render('pages/contact',{
    menu:createMenuObject('Contato'),
    usertokenid:token['userId'],
    usertokenname:token["userName"],
    usertokenphoto:token["userPhoto"]

  })
}












  


export const teste = async (req: Request, res: Response) => {
  try {
    const employeeRepository = getRepository(Employe);

    const employeeWithQualifications = await employeeRepository.findOne({
      where: { id: 2 }, 
      relations: ['qualification'],
    });

    if (!employeeWithQualifications) {
      return res.status(404).json({ message: 'Employee não encontrado' });
    }

    // O objeto employeeWithQualifications agora conterá as Qualifications associadas ao Employee
    res.json(employeeWithQualifications);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
    
export const testeone = async (req: Request, res: Response) => {
    try {
        const sectorRepository = getRepository(Sector);
        const subsectorRepository = getRepository(Subsector);
    
        // Consultar todos os setores
        const sectors = await sectorRepository.find();
    
        // Consultar todos os subsetores
        const subsectors = await subsectorRepository.find();
    
        res.json({ sectors, subsectors });
      } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
      }
};
    



export const perfiluser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    

if (isNaN(userId)) {
    return res.status(400).render('pages/404', { message: 'ID de usuário inválido' });
}



  console.log(req.file)


  const userRepository = getRepository(User);
  const user = await userRepository.findOne({where:{id:userId}});

 

  return res.render('perfil/perfiluser', { user:user });


if (!user) {
    return res.status(404).render('pages/404', { message: 'Usuário não encontrado' });
}

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).render('pages/404', { message: 'Erro interno do servidor' });
  }


};

export const perfilusers = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const photo = req.file
    if (isNaN(userId)) {
      return res.status(400).render('pages/404', { message: 'ID de usuário inválido' });
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    
    const foto = req.file?.filename
    console.log(photo)
    let test = await userRepository.update(userId, { photo: foto });
    console.log(test)
    return res.render('perfil/perfiluser', { user });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).render('pages/500', { message: 'Erro interno do servidor' });
  }


};



export const perfilemployee = async (req: Request, res: Response) => {
  try {
    const employeId = parseInt(req.params.id);

if (isNaN(employeId)) {
    return res.status(400).render('pages/404', { message: 'ID de usuário inválido' });
}

  

  


  const employeRepository = getRepository(Employe);
  const employe = await employeRepository.findOne({where:{id:employeId}});

  const employeeWithQualifications = await employeRepository.findOne({
    where: { id: employeId }, 
    relations: ['qualification'],
  });
  employeeWithQualifications.qualification

  return res.render('perfil/perfilemployee', { 
    user:employe,
    qualifications:employeeWithQualifications.qualification
    , });

if (!employe) {
    return res.status(404).render('pages/404', { message: 'Usuário não encontrado' });
}

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).render('pages/404', { message: 'Erro interno do servidor' });
  }


};
    


    


// export const login = async (req: Request, res: Response) => {
//     if(req.body.email && req.body.password) {
//         let email: string = req.body.email;
//         let password: string = req.body.password;

//         let user = await User.findOne({ 
//             where: { email, password }
//         });

//         if(user) {
//             res.json({ status: true });
//             return;
//         }
//     }

//     res.json({ status: false });
// }

// export const list = async (req: Request, res: Response) => {
//     let users = await User.findAll();
//     let list: string[] = [];

//     for(let i in users) {
//         list.push( users[i].email );
//     }

//     res.json({ list });
// }