import { Router } from 'express';
import multer from 'multer';
import path from 'path'; 

import * as ApiController from '../controllers/apiController';
import * as SearchController from '../controllers/searchController';
import * as SubsectorsController from '../controllers/subsectorsController';
import * as authenticateToken from '../Middleware/Middleware'







const destinationPath = path.resolve(__dirname, '/Users/G4Flex/Desktop/NodeJs/projeto g4workplace-site/public/fotodapessoa');

const storageconfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationPath); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '.jpg');
    }
});

const upload = multer({
    storage: storageconfig
});

const router = Router();




//LOGIN
router.get('/register', upload.single('imagem'), ApiController.register);
router.get('/login',  ApiController.login);
router.get('/forgot_password',  ApiController.forgot_password);
router.get('/alter_password',  ApiController.alter_password);

router.post('/forgot_password_sucess',  ApiController.forgot_password_sucess);


router.get('/logout',  ApiController.logout);


//loign-post
router.post('/registersucess', upload.single('imagem'), ApiController.registersucess);
router.post('/loginsucess',  ApiController.loginsucess);


//paginainicial
router.get('/home', authenticateToken.default ,ApiController.employee);
router.get('/sector', authenticateToken.default ,ApiController.sector);
router.get('/customer',  authenticateToken.default,ApiController.customer);
router.get('/contact', authenticateToken.default,ApiController.contact);

//pesquisa
router.get('/search',authenticateToken.default,SearchController.search)


//paginas do sub-setor(desenvolvimento-backend)
router.get('/subsectordev', authenticateToken.default, SubsectorsController.subsectordev);
router.get('/backendconfig', authenticateToken.default, SubsectorsController.backendconfig);
router.get('/backendemploye',  authenticateToken.default,SubsectorsController.backendemploye);
router.get('/backendhowwork',  authenticateToken.default,SubsectorsController.backendhowwork);

//paginas do sub-setor(desenvolvimento-frontend)
router.get('/frontendconfig', authenticateToken.default, SubsectorsController.frontendconfig);
router.get('/frontendemploye', authenticateToken.default, SubsectorsController.frontendemploye);
router.get('/frontendhowwork',  authenticateToken.default,SubsectorsController.frontendhowwork);

//paginas do sub-setor(desenvolvimento-mobile)
router.get('/mobileconfig',  authenticateToken.default,SubsectorsController.mobileconfig);
router.get('/mobileemploye',  authenticateToken.default,SubsectorsController.mobileemploye);
router.get('/mobilehowwork',  authenticateToken.default,SubsectorsController.mobilehowwork);

//paginas do sub-setor(desenvolvimento-IA)
router.get('/iaconfig',  authenticateToken.default,SubsectorsController.iaconfig);
router.get('/iaemploye',  authenticateToken.default,SubsectorsController.iaemploye);
router.get('/iahowwork',  authenticateToken.default,SubsectorsController.iahowwork);




//paginas do sub-setor(suporte-ativação)
router.get('/subsectorsuporte', authenticateToken.default, SubsectorsController.subsectorsuporte);
router.get('/ativacaoconfig', authenticateToken.default, SubsectorsController.ativaçãoconfig);
router.get('/ativacaoemploye',  authenticateToken.default,SubsectorsController.ativaçãoemploye);
router.get('/ativacaohowwork',  authenticateToken.default,SubsectorsController.ativaçãohowwork);

//paginas do sub-setor(suporte-cscx)
router.get('/cscxconfig', authenticateToken.default, SubsectorsController.cscxconfig);
router.get('/cscxemploye', authenticateToken.default, SubsectorsController.cscxemploye);
router.get('/cscxhowwork',  authenticateToken.default,SubsectorsController.cscxhowwork);

//paginas do sub-setor(suporte-infraestrutura)
router.get('/infraestruturaeconfig',  authenticateToken.default,SubsectorsController.infraestruturaconfig);
router.get('/infraestruturaemploye',  authenticateToken.default,SubsectorsController.infraestruturaemploye);
router.get('/infraestruturahowwork',  authenticateToken.default,SubsectorsController.infraestruturahowwork);

//paginas do sub-setor(suporte-sustentação)
router.get('/sustentacaoeconfig',  authenticateToken.default,SubsectorsController.sustentaçãoconfig);
router.get('/sustentacaoemploye',  authenticateToken.default,SubsectorsController.sustentaçãoemploye);
router.get('/sustentacaohowwork',  authenticateToken.default,SubsectorsController.sustentaçãohowwork);

//paginas do sub-setor(comercial)
router.get('/cormecialconfig',  authenticateToken.default,SubsectorsController.comercialconfig);
router.get('/comercialemploye',  authenticateToken.default,SubsectorsController.comercialemploye);
router.get('/comercialhowwork',  authenticateToken.default,SubsectorsController.comercialhowwork);

//paginas do sub-setor(financeiro)
router.get('/financeiroconfig',  authenticateToken.default,SubsectorsController.financeiroconfig);
router.get('/financeiroemploye',  authenticateToken.default,SubsectorsController.financeiroemploye);
router.get('/financeirohowwork',  authenticateToken.default,SubsectorsController.financeirohowwork);

//perfil
router.get('/perfil/:id', upload.single('imagem'),authenticateToken.default,ApiController.perfiluser);
router.post('/perfilpost/:id', upload.single('imagem'),authenticateToken.default,ApiController.perfilusers);
router.get('/perfilemployee/:id', authenticateToken.default,ApiController.perfilemployee);







router.post('/test', ApiController.teste);
router.post('/test1', ApiController.testeone);
// router.post('/login', ApiController.login);

// router.get('/list', ApiController.list);

export default router;
