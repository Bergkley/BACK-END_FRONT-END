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
import * as ApiController from '../controllers/apiController';
import cookie from 'cookie';
import * as jwt from 'jsonwebtoken';

//DEV

export const subsectordev = async (req: Request, res: Response) => {
    try {
      const subsectorRepository = getRepository(Subsector);
  
      const developmentSectorId = 2; // Supondo que o ID do setor de Desenvolvimento seja 1
  
      // Consulte os subsectors relacionados ao setor de Desenvolvimento
      const subsectors = await subsectorRepository
        .createQueryBuilder('subsector')
        .where('subsector.sectorId = :sectorId', { sectorId: developmentSectorId })
        .getMany();
        
        const cookiee= cookie.parse(req.headers.cookie)

        const token = jwt.decode(cookiee.token)

      res.render('pages/subsector',{
        list:subsectors,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
      })
    } catch (error) {
      console.error('Erro ao recuperar os subsectors:', error);
      res.status(500).json({ message: 'Ocorreu um erro ao recuperar os subsectors.' });
    }
}



export const backendconfig = async (req: Request, res: Response) => {
    res.render("subsectorsdev/backendconfig")
}

export const backendemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const subsectorName = 'Back-End'; 
        const subsectorRepository = getRepository(Subsector);
        const backendSubsector = await subsectorRepository.findOne({ where: { name: subsectorName } });

        if (!backendSubsector) {
            return res.status(404).json({ message: `Subsector ${subsectorName} não encontrado` });
        }

        const employeesInBackend = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: backendSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();


            
            const cookiee= cookie.parse(req.headers.cookie) 

            const token = jwt.decode(cookiee.token)

        res.render('pages/listafunc',{
            list:employeesInBackend,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}
export const backendhowwork = async (req: Request, res: Response) => {
    const text = `
    O "back-end" refere-se à parte de um sistema de software ou de um aplicativo que lida com a lógica de negócios, 
    
    Aqui estão alguns componentes-chave relacionados ao back-end:
    
    1. Servidores
    2. Lógica de Negócios
    3. Banco de Dados
    4. APIs (Interfaces de Programação de Aplicativos)
    5. Segurança
    6. Escalabilidade
    7. Tecnologias
    Em resumo, o back-end é o cuidando da lógica, processamento e gerenciamento de dados que permitem que um aplicativo ou sistema funcione de forma eficiente e segura. 
    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'backend.png'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}






export const frontendconfig = async (req: Request, res: Response) => {
    res.render("subsectorsdev/frontendconfig")
}

export const frontendemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const frontendName = 'Front-End'; 
        const subsectorRepository = getRepository(Subsector);
        const frontendSubsector = await subsectorRepository.findOne({ where: { name: frontendName } });

        if (!frontendSubsector) {
            return res.status(404).json({ message: `Subsector ${frontendName} não encontrado` });
        }

        const employeesInBackend = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: frontendSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();

        const cookiee= cookie.parse(req.headers.cookie)

        const token = jwt.decode(cookiee.token)
        res.render('pages/listafunc',{
            list:employeesInBackend,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}
export const frontendhowwork = async (req: Request, res: Response) => {
    const text = `
    O frontend é a parte de um sistema de software ou aplicativo que os usuários interagem diretamente. 

    Principais tecnologias e linguagens de programação utilizadas no frontend incluem:

    1.HTML (Hypertext Markup Language)
    2.CSS (Cascading Style Sheets)
    3.JavaScript 
    4.Frameworks e Bibliotecas
    5.Pré-processadores CSS
    6.Gerenciadores de Pacotes
    7.Task Runners e Bundlers

    frontend é uma parte crucial do desenvolvimento de software, pois determina em grande parte a experiência do usuário.


    `;

    const photo= 'frontend.jpg'

    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}







export const mobileconfig = async (req: Request, res: Response) => {
    res.render("subsectorsdev/mobileconfig")
}

export const mobileemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const MobileName = 'Mobile'; 
        const subsectorRepository = getRepository(Subsector);
        const MobileSubsector = await subsectorRepository.findOne({ where: { name: MobileName } });

        if (!MobileSubsector) {
            return res.status(404).json({ message: `Subsector ${MobileName} não encontrado` });
        }

        const employeesInBackend = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: MobileSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();

        const cookiee= cookie.parse(req.headers.cookie)

        const token = jwt.decode(cookiee.token)
        res.render('pages/listafunc',{
            list:employeesInBackend,
            
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }

}


export const mobilehowwork = async (req: Request, res: Response) => {
    const text = `
    A programação mobile é uma área de desenvolvimento de software focada na criação de aplicativos para dispositivos móveis, como smartphones e tablets. 
    Ela envolve a escrita de código para sistemas operacionais móveis, como Android e iOS.
    linguagens de programação: como Dart,Java, Kotlin, Swift e Objective-C.

    `;

    const photo= 'Mobile.png'
    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)
    res.render('pages/howwork',{
        list:text,
        photo:photo,
      usertokenid:token['userId'],
      usertokenname:token["userName"],
      usertokenphoto:token["userPhoto"]
    })
}





export const iaconfig = async (req: Request, res: Response) => {
    res.render("subsectorsdev/iaconfig")
}


export const iaemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const iaName = 'Inteligencia Artificial'; 
        const subsectorRepository = getRepository(Subsector);
        const iaSubsector = await subsectorRepository.findOne({ where: { name: iaName } });

        if (!iaSubsector) {
            return res.status(404).json({ message: `Subsector ${iaName} não encontrado` });
        }

        const employeesInia= await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: iaSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();

        const cookiee= cookie.parse(req.headers.cookie)

        const token = jwt.decode(cookiee.token)
        res.render('pages/listafunc',{
            list:employeesInia,
            
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}



export const iahowwork = async (req: Request, res: Response) => {
    const text = `
    A IA é uma disciplina que se concentra no desenvolvimento de sistemas de computador capazes de realizar tarefas que normalmente requerem inteligência humana.

    Aqui estão algumas maneiras em que a IA está integrada à área de TI:

    Aprendizado de Máquina e Análise de Dados

    Automatização de Processos

    Assistência Virtual e Chatbots:

    Segurança Cibernética

    Sistemas de Recomendação 

    Processamento de Linguagem Natural (NLP)
    `;

    const photo= 'inteligenciaartificial.jpg'
    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)
    res.render('pages/howwork',{
        list:text,
        photo:photo,
      usertokenid:token['userId'],
      usertokenname:token["userName"],
      usertokenphoto:token["userPhoto"]
    })
}


//DEV

//SUPORTE

export const subsectorsuporte = async (req: Request, res: Response) => {
    try {
      const subsectorRepository = getRepository(Subsector);
  
      const suporteSectorId = 3; 
  
      const subsectors = await subsectorRepository
        .createQueryBuilder('subsector')
        .where('subsector.sectorId = :sectorId', { sectorId: suporteSectorId })
        .getMany();

        
        const cookiee= cookie.parse(req.headers.cookie)

        const token = jwt.decode(cookiee.token)

      res.render('pages/subsector',{
        list:subsectors,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
      })
    } catch (error) {
      console.error('Erro ao recuperar os subsectors:', error);
      res.status(500).json({ message: 'Ocorreu um erro ao recuperar os subsectors.' });
    }

}

export const ativaçãoconfig = async (req: Request, res: Response) => {
    res.render("subsectorssuporte/ativaçãoconfig")
}

export const ativaçãoemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const subsectorName = 'Ativação'; 
        const subsectorRepository = getRepository(Subsector);
        const AtivaçãoSubsector = await subsectorRepository.findOne({ where: { name: subsectorName } });


        
        if (!AtivaçãoSubsector) {
            return res.status(404).json({ message: `Subsector ${subsectorName} não encontrado` });
        }

        const employeesInAtivação = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: AtivaçãoSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();
            
            const cookiee= cookie.parse(req.headers.cookie)
            const token = jwt.decode(cookiee.token)

        res.render('pages/listafunc',{
            list:employeesInAtivação,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}




export const ativaçãohowwork = async (req: Request, res: Response) => {
    const text = `
área de ativação de infraestrutura são responsáveis por garantir que sistemas, redes e recursos de TI estejam funcionando  para atender às necessidades da organização.

Provisionamento de Recursos 

Configuração e Instalação

Manutenção Preventiva

Monitoramento e Diagnóstico

Segurança da Infraestrutura

Backup e Recuperação de Dados 

Suporte Técnico


    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'ativação.jpg'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}


export const cscxconfig = async (req: Request, res: Response) => {
    res.render("subsectorssuporte/cscxconfig")
}


export const cscxemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const subsectorName = 'CSCX'; 
        const subsectorRepository = getRepository(Subsector);
        const cscxSubsector = await subsectorRepository.findOne({ where: { name: subsectorName } });


        
        if (!cscxSubsector) {
            return res.status(404).json({ message: `Subsector ${subsectorName} não encontrado` });
        }

        const employeesIncscx = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: cscxSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();
            
            const cookiee= cookie.parse(req.headers.cookie)
            const token = jwt.decode(cookiee.token)

        res.render('pages/listafunc',{
            list:employeesIncscx,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}


export const cscxhowwork = async (req: Request, res: Response) => {
    const text = `
    CSCX (Customer Service and Experience) é uma área que se concentra na melhoria da experiência do cliente em uma empresa ou organização. 

    Especialista em Experiência do Usuário (UX)
    
    Analista de Suporte Técnico  
    
    Gerente de Relacionamento com o Cliente 
    
    Analista de Qualidade: 
    
    Analista de Dados:
    
    Gerente de Produto 
    
    Especialista em Treinamento
    
    Especialista em Comunicação
    
    Engenheiro de Software
    
    Especialista em Atendimento ao Cliente Online

    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'cscx.png'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}



export const infraestruturaconfig = async (req: Request, res: Response) => {
    res.render("subsectorssuporte/infraestruturaconfig")
}


export const infraestruturaemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const subsectorName = 'Infraestrutura'; 
        const subsectorRepository = getRepository(Subsector);
        const InfraestruturaSubsector = await subsectorRepository.findOne({ where: { name: subsectorName } });


        
        if (!InfraestruturaSubsector) {
            return res.status(404).json({ message: `Subsector ${subsectorName} não encontrado` });
        }

        const employeesInInfraestrutura = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: InfraestruturaSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();
            
            const cookiee= cookie.parse(req.headers.cookie)
            const token = jwt.decode(cookiee.token)

        res.render('pages/listafunc',{
            list:employeesInInfraestrutura,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}

export const infraestruturahowwork = async (req: Request, res: Response) => {
    const text = `
    Área de infraestrutura são responsáveis por projetar, implementar, gerenciar e manter a infraestrutura tecnológica que suporta as operações de TI de uma empresa. 

    Administrador de Redes 

    Engenheiro de Sistemas

    Administrador de Servidores

    Especialista em Segurança da Informação

    Administrador de Banco de Dados

    Administrador de Armazenamento 

    Técnico de Suporte 

    Engenheiro de Virtualização 

    Especialista em Cloud Computing 

    Gerente de Infraestrutura de TI

    Especialista em Automação 

    Especialista em Monitoramento de Desempenho

    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'infraestrutura.png'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}

export const sustentaçãoconfig = async (req: Request, res: Response) => {
    res.render("subsectorssuporte/sustentaçãoconfig")
}


export const sustentaçãoemploye = async (req: Request, res: Response) => {
    try {
        const employeeRepository = getRepository(Employe);
      
        const subsectorName = 'Sustentação'; 
        const subsectorRepository = getRepository(Subsector);
        const SustentaçãoSubsector = await subsectorRepository.findOne({ where: { name: subsectorName } });


        
        if (!SustentaçãoSubsector) {
            return res.status(404).json({ message: `Subsector ${subsectorName} não encontrado` });
        }

        const employeesInSustentação = await employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.subsectors', 'subsector')
            .where('subsector.id = :subsectorId', { subsectorId: SustentaçãoSubsector.id })
            .orderBy('employee.name', 'ASC')
            .getMany();
            
            const cookiee= cookie.parse(req.headers.cookie)
            const token = jwt.decode(cookiee.token)

        res.render('pages/listafunc',{
            list:employeesInSustentação,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os funcionários do subsector de backend.' });
    }
}


export const sustentaçãohowwork = async (req: Request, res: Response) => {
    const text = `
Área de infraestrutura desempenham um papel fundamental no funcionamento contínuo de sistemas, aplicativos e infraestrutura de tecnologia da informação (TI) de uma organização.

Atendimento ao Cliente

Resolução de Problemas
 
Manutenção Preventiva
 
Gerenciamento de Incidentes 

Documentação 

Treinamento 

Colaboração

Gerenciamento de Chamados

Monitoramento 

Comunicação 

Atualizações e Melhorias 

Conhecimento Técnico

Disponibilidade 24/7

    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'sustentacao.jpg'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}


//SUPORTE

//COMERCIAL



export const comercialconfig = async (req: Request, res: Response) => {
    res.render("comercial/comercialconfig")
}


export const comercialemploye = async (req: Request, res: Response) => {
    try {
        const sectorRepository = getRepository(Sector);
        const employeeRepository = getRepository(Employe);

        const comercialSector = await sectorRepository.findOne({ where: { name: 'COMERCIAL' } });

        if (!comercialSector) {

            return res.status(404).json({ message: 'Setor comercial não encontrado.' });
        }

    
        const commercialEmployees = await employeeRepository.find({ where: { sectors: comercialSector } });
        
        const cookiee= cookie.parse(req.headers.cookie)
        const token = jwt.decode(cookiee.token)


        res.render('pages/listafunc',{
            list:commercialEmployees,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        }) 

    
        
    } catch (error) {
        console.error('Erro ao buscar funcionários do setor comercial:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
       
}



export const comercialhowwork = async (req: Request, res: Response) => {
    const text = `
    A área comercial de uma empresa refere-se à parte da organização responsável pelas atividades relacionadas com a venda de produtos ou serviços.

    Aqui estão algumas das principais funções e responsabilidades da área comercial:
    
    Vendas
    
    Marketing
    
    Desenvolvimento de clientes

    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'comercial.png'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}


//COMERCIAL

//FINANCEIRO


export const financeiroconfig = async (req: Request, res: Response) => {
    res.render("financeiro/financeiroconfig")
}

export const financeiroemploye = async (req: Request, res: Response) => {
    try {
        const sectorRepository = getRepository(Sector);
        const employeeRepository = getRepository(Employe);

        const financeiroSector = await sectorRepository.findOne({ where: { name: 'FINANCEIRO' } });

        if (!financeiroSector) {

            return res.status(404).json({ message: 'Setor comercial não encontrado.' });
        }

    
        const financeiroEmployees = await employeeRepository.find({ where: { sectors: financeiroSector } });
        
        const cookiee= cookie.parse(req.headers.cookie)
        const token = jwt.decode(cookiee.token)


        res.render('pages/listafunc',{
            list:financeiroEmployees,
            usertokenid:token['userId'],
            usertokenname:token["userName"],
            usertokenphoto:token["userPhoto"]
        }) 

    
        
    } catch (error) {
        console.error('Erro ao buscar funcionários do setor comercial:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
       
}

export const financeirohowwork = async (req: Request, res: Response) => {
    const text = `
    A área do financeiro refere-se a um departamento ou função em uma organização que lida com todas as atividades relacionadas às finanças da empresa.

    É responsável por gerenciar os recursos financeiros, controlar as transações financeiras e elaborar relatórios financeiros.

    Algumas das principais responsabilidades da área financeira incluem:

    Contabilidade

    Planejamento Financeiro

    Controle Financeiro

    Tesouraria

    Finanças Corporativas

    Relatórios Financeiros

    Auditoria



    `;


    const cookiee= cookie.parse(req.headers.cookie)

    const token = jwt.decode(cookiee.token)

    const photo= 'Financeiro.jpg'
    res.render('pages/howwork',{
        list:text,
        photo:photo,
        usertokenid:token['userId'],
        usertokenname:token["userName"],
        usertokenphoto:token["userPhoto"]
    })
}





//FINANCEIRO