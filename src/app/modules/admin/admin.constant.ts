
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export const BloodGroup:TBloodGroup[] =['A+','A-','AB+','AB-','B+','B-','O+','O-'];

export type TGender = "male" | "female" | "other";
export const Gender:TGender[] = ['male','female','other'];
export const adminSearchableFields = ['email','id','contactNo','emergencyContactNo','name.firstName','name.lastName','name.middleName',];