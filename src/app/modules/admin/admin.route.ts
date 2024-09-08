import  express from 'express'
import { AdminControllers } from './admin.controllers';
import validateRequest from '../../middleware/validateRequest';
import { UpdateAdminValidationZodSchema } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmin)
router.get('/:adminId', AdminControllers.getAdminId);

router.patch('/:adminId', validateRequest(UpdateAdminValidationZodSchema), AdminControllers.updateAdmin);
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const adminRoutes = router;