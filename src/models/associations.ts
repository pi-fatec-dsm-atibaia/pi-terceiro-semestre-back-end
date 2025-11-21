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

/* ---------------------------------------------------------
   ADMINISTRADOR ↔ CURSO  (N:N)
--------------------------------------------------------- */
Administrator.belongsToMany(Course, {
    through: CourseRegistration,
    foreignKey: 'idAdministrador',
    as: 'cursosCadastrados',
});

Course.belongsToMany(Administrator, {
    through: CourseRegistration,
    foreignKey: 'idCurso',
    as: 'administradores',
});

/* ---------------------------------------------------------
   ADMINISTRADOR (1:N) ADM_VINCULO
--------------------------------------------------------- */
Administrator.hasMany(AdminLink, {
    foreignKey: 'idAdministrador',
    as: 'vinculosAdministrador',
});

AdminLink.belongsTo(Administrator, {
    foreignKey: 'idAdministrador',
    as: 'administrador',
});

/* ---------------------------------------------------------
   VINCULO (1:N) ADM_VINCULO
--------------------------------------------------------- */
Link.hasMany(AdminLink, {
    foreignKey: 'idVinculo',
    as: 'adminVinculos',
});

AdminLink.belongsTo(Link, {
    foreignKey: 'idVinculo',
    as: 'vinculo',
});

/* ---------------------------------------------------------
   CURSO (1:N) VINCULO
--------------------------------------------------------- */
Course.hasMany(Link, {
    foreignKey: 'idCurso',
    as: 'vinculosCurso',
});

Link.belongsTo(Course, {
    foreignKey: 'idCurso',
    as: 'curso',
});

/* ---------------------------------------------------------
   ORIENTADOR (1:N) VINCULO
--------------------------------------------------------- */
Advisor.hasMany(Link, {
    foreignKey: 'idOrientador',
    as: 'vinculosOrientador',
});

Link.belongsTo(Advisor, {
    foreignKey: 'idOrientador',
    as: 'orientador',
});

/* ---------------------------------------------------------
   CURSO (1:N) ALUNO
--------------------------------------------------------- */
Course.hasMany(Student, {
    foreignKey: 'idCurso',
    as: 'alunos',
});

Student.belongsTo(Course, {
    foreignKey: 'idCurso',
    as: 'curso',
});

/* ---------------------------------------------------------
   DOCUMENTO (1:N) SOLICITACAO
--------------------------------------------------------- */
Document.belongsTo(Request, {
    foreignKey: 'idSolicitacao',
    as: 'Solicitacao',
});

Request.hasMany(Document, {
    foreignKey: 'idSolicitacao',
    as: 'Solicitacao',
});

/* ---------------------------------------------------------
   EQUIVALENCIA (1:N) SOLICITACAO
--------------------------------------------------------- */
Equivalence.hasMany(Request, {
    foreignKey: 'idEquivalencia',
    as: 'solicitacoes',
});

Request.belongsTo(Equivalence, {
    foreignKey: 'idEquivalencia',
    as: 'equivalencia',
});

/* ---------------------------------------------------------
   ALUNO (1:N) SOLICITACAO
--------------------------------------------------------- */
Student.hasMany(Request, {
    foreignKey: 'idAluno',
    as: 'solicitacoesAluno',
});

Request.belongsTo(Student, {
    foreignKey: 'idAluno',
    as: 'aluno',
});

/* ---------------------------------------------------------
   EMPRESA (1:N) EMPREGADOR
--------------------------------------------------------- */
Company.hasMany(Employer, {
    foreignKey: 'idEmpresa',
    as: 'empregadoresEmpresa',
});

Employer.belongsTo(Company, {
    foreignKey: 'idEmpresa',
    as: 'empresa',
});

/* ---------------------------------------------------------
   SOLICITACAO (1:N) EMPREGADOR
--------------------------------------------------------- */
Employer.hasMany(Request, {
    foreignKey: 'idEmpregador',
    as: 'empregadoresSolicitacao',
});

Request.belongsTo(Employer, {
    foreignKey: 'idEmpregador',
    as: 'solicitacao',
});
