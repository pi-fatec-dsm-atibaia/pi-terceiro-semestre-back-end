import { BelongsTo } from 'sequelize';
import Administrator from './Admin';
import AdminLink from './AdminLink';
import Advisor from './Advisor';
import Company from './Company';
import Course from './Course';
import CourseRegistration from './CourseRegistration';
import Document from './Document';
import Employer from './Employer';
import Equivalence from './Equivalence';
import Link from './Links';
import Request from './Request';
import Student from './Student';

/**
 * Associação entre Administrador e CadastroCurso
 * (N:M) Um administrador pode cadastrar vários cursos, e um curso pode ser cadastrado por vários administradores.
 */

Administrator.belongsToMany(Course, {
    through: CourseRegistration,
    foreignKey: 'idAdministrador',
    as: 'cursos',
});

Course.belongsToMany(Administrator, {
    through: CourseRegistration,
    foreignKey: 'idCurso',
    as: 'administradores',
});

/**
 * Associação entre Administrador e AdmVinculo
 * (1:N) Um administrador pode estar vinculado a vários vínculos.
 */

Administrator.hasMany(AdminLink, {
    foreignKey: 'idAdministrador',
    as: 'admVinculo',
});

AdminLink.belongsTo(Administrator, {
    foreignKey: 'idAdministrador',
    as: 'administrador',
});

/**
 * Associação entre Vinculo e AdmVinculo
 * (1:N) Um vínculo pode estar associado a vários registros de AdmVinculo.
 */

Link.hasMany(AdminLink, {
    foreignKey: 'idVinculo',
    as: 'vinculo',
});

AdminLink.belongsTo(Link, {
    foreignKey: 'idVInculo',
    as: 'vinculo',
});

/**
 * Associação entre Curso e Vinculo
 * (1:N) Um curso pode ter vários vínculos.
 */

Course.hasMany(Link, {
    foreignKey: 'idCurso',
    as: 'vinculos',
});

Link.belongsTo(Course, {
    foreignKey: 'idCurso',
    as: 'curso',
});

/**
 * Associação entre Orientador e Vinculo
 * (1:N) Um orientador pode supervisionar vários vínculos.
 */

Advisor.hasMany(Link, {
    foreignKey: 'idOrientador',
    as: 'vinculos',
});

Link.belongsTo(Advisor, {
    foreignKey: 'idOrientador',
    as: 'orientador',
});

/**
 * Associação entre Curso e Aluno
 * (1:N) Um curso possui vários alunos.
 */

Course.hasMany(Student, {
    foreignKey: 'idCurso',
    as: 'alunos',
});

Student.belongsTo(Course, {
    foreignKey: 'idCurso',
    as: 'curso',
});

/**
 * Associação entre Documento e Equivalencia
 * (1:N) Um documento pode estar relacionado a várias equivalências.
 */

Document.hasMany(Equivalence, {
    foreignKey: 'idDocumento',
    as: 'equivalencias',
});

Equivalence.belongsTo(Document, {
    foreignKey: 'idDocumento',
    as: 'documento',
});

/**
 * Associação entre Equivalencia e Solicitacao
 * (1:N) Uma equivalência pode estar em várias solicitações.
 */

Equivalence.hasMany(Request, {
    foreignKey: 'idEquivalencia',
    as: 'solicitacoes',
});

Request.belongsTo(Equivalence, {
    foreignKey: 'idEquivalencia',
    as: 'equivalencia',
});

/**
 * Associação entre Aluno e Solicitacao
 * (1:N) Um aluno pode fazer várias solicitações.
 */

Student.hasMany(Request, {
    foreignKey: 'idAluno',
    as: 'solicitacoes',
});

Request.belongsTo(Student, {
    foreignKey: 'idAluno',
    as: 'solicitacoes',
});

/**
 * Associação entre Empresa e Empregador
 * (1:N) Uma empresa pode ter vários empregadores.
 */

Company.hasMany(Employer, {
    foreignKey: 'idEmpresa',
    as: 'empregadores',
});

Employer.belongsTo(Company, {
    foreignKey: 'idEmpresa',
    as: 'empresa', 
});

/**
 * Associação entre Solicitacao e Empregador
 * (1:N) Uma solicitação pode ter vários empregadores associados.
 */

Request.hasMany(Employer, {
    foreignKey: 'idSolicitacao',
    as: 'empregadores',
});

Employer.belongsTo(Request, {
    foreignKey: 'idSolicitacao',
    as: 'solicitacao',
});