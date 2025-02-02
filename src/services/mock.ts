const contratosMock = [
    {
        "id": 1,
        "nomeResponsavel": "Carlos Oliveira",
        "escola": "Instituto Juliana",
        "cidade": "Salvador",
        "uf": "PE",
        "status": "paid"
    },
    {
        "id": 2,
        "nomeResponsavel": "Carlos Rodrigues",
        "escola": "Escola Gabriela",
        "cidade": "Belo Horizonte",
        "uf": "SC",
        "status": "paid"
    },
    {
        "id": 3,
        "nomeResponsavel": "Fernanda Almeida",
        "escola": "Colégio Fernanda",
        "cidade": "Rio de Janeiro",
        "uf": "SC",
        "status": "pending"
    },
    {
        "id": 4,
        "nomeResponsavel": "Gabriela Almeida",
        "escola": "Centro Educacional João",
        "cidade": "São Paulo",
        "uf": "PR",
        "status": "paid"
    },
    {
        "id": 5,
        "nomeResponsavel": "Maria Pereira",
        "escola": "Escola João",
        "cidade": "Porto Alegre",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 6,
        "nomeResponsavel": "Maria Oliveira",
        "escola": "Instituto Ana",
        "cidade": "Rio de Janeiro",
        "uf": "RS",
        "status": "pending"
    },
    {
        "id": 7,
        "nomeResponsavel": "Juliana Ferreira",
        "escola": "Centro Educacional Juliana",
        "cidade": "Porto Alegre",
        "uf": "SP",
        "status": "pending"
    },
    {
        "id": 8,
        "nomeResponsavel": "Juliana Oliveira",
        "escola": "Instituto Maria",
        "cidade": "Florianópolis",
        "uf": "SC",
        "status": "paid"
    },
    {
        "id": 9,
        "nomeResponsavel": "Gabriela Oliveira",
        "escola": "Centro Educacional Paulo",
        "cidade": "Recife",
        "uf": "MG",
        "status": "pending"
    },
    {
        "id": 10,
        "nomeResponsavel": "Maria Silva",
        "escola": "Colégio Ana",
        "cidade": "Salvador",
        "uf": "MG",
        "status": "paid"
    },
    {
        "id": 11,
        "nomeResponsavel": "Gabriela Rodrigues",
        "escola": "Instituto Carlos",
        "cidade": "Rio de Janeiro",
        "uf": "BA",
        "status": "pending"
    },
    {
        "id": 12,
        "nomeResponsavel": "Maria Ferreira",
        "escola": "Instituto Carlos",
        "cidade": "São Paulo",
        "uf": "RS",
        "status": "paid"
    },
    {
        "id": 13,
        "nomeResponsavel": "Paulo Almeida",
        "escola": "Centro Educacional Fernanda",
        "cidade": "Florianópolis",
        "uf": "RS",
        "status": "paid"
    },
    {
        "id": 14,
        "nomeResponsavel": "Paulo Almeida",
        "escola": "Colégio Carlos",
        "cidade": "Rio de Janeiro",
        "uf": "PR",
        "status": "pending"
    },
    {
        "id": 15,
        "nomeResponsavel": "João Silva",
        "escola": "Escola João",
        "cidade": "Florianópolis",
        "uf": "RS",
        "status": "pending"
    },
    {
        "id": 16,
        "nomeResponsavel": "Paulo Souza",
        "escola": "Centro Educacional Lucas",
        "cidade": "Recife",
        "uf": "SC",
        "status": "pending"
    },
    {
        "id": 17,
        "nomeResponsavel": "Fernanda Oliveira",
        "escola": "Colégio Fernanda",
        "cidade": "São Paulo",
        "uf": "BA",
        "status": "paid"
    },
    {
        "id": 18,
        "nomeResponsavel": "Carlos Oliveira",
        "escola": "Escola Paulo",
        "cidade": "Salvador",
        "uf": "SP",
        "status": "pending"
    },
    {
        "id": 19,
        "nomeResponsavel": "Maria Souza",
        "escola": "Colégio Fernanda",
        "cidade": "Belo Horizonte",
        "uf": "MG",
        "status": "paid"
    },
    {
        "id": 20,
        "nomeResponsavel": "Ana Almeida",
        "escola": "Instituto Fernanda",
        "cidade": "São Paulo",
        "uf": "SC",
        "status": "pending"
    },
    {
        "id": 21,
        "nomeResponsavel": "Maria Ferreira",
        "escola": "Instituto João",
        "cidade": "Florianópolis",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 22,
        "nomeResponsavel": "Gabriela Oliveira",
        "escola": "Escola Lucas",
        "cidade": "Curitiba",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 23,
        "nomeResponsavel": "Paulo Ferreira",
        "escola": "Colégio Maria",
        "cidade": "Rio de Janeiro",
        "uf": "BA",
        "status": "paid"
    },
    {
        "id": 24,
        "nomeResponsavel": "João Silva",
        "escola": "Escola Lucas",
        "cidade": "Florianópolis",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 25,
        "nomeResponsavel": "Maria Almeida",
        "escola": "Instituto Juliana",
        "cidade": "Recife",
        "uf": "RS",
        "status": "paid"
    },
    {
        "id": 26,
        "nomeResponsavel": "Maria Silva",
        "escola": "Instituto Gabriela",
        "cidade": "Florianópolis",
        "uf": "MG",
        "status": "pending"
    },
    {
        "id": 27,
        "nomeResponsavel": "Juliana Pereira",
        "escola": "Escola Paulo",
        "cidade": "Rio de Janeiro",
        "uf": "RS",
        "status": "paid"
    },
    {
        "id": 28,
        "nomeResponsavel": "Gabriela Pereira",
        "escola": "Centro Educacional Ana",
        "cidade": "Porto Alegre",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 29,
        "nomeResponsavel": "Ana Lima",
        "escola": "Escola Paulo",
        "cidade": "Curitiba",
        "uf": "SP",
        "status": "pending"
    },
    {
        "id": 30,
        "nomeResponsavel": "João Almeida",
        "escola": "Colégio Ana",
        "cidade": "Salvador",
        "uf": "RJ",
        "status": "paid"
    },
    {
        "id": 31,
        "nomeResponsavel": "Juliana Costa",
        "escola": "Colégio Rafael",
        "cidade": "Curitiba",
        "uf": "SP",
        "status": "paid"
    },
    {
        "id": 32,
        "nomeResponsavel": "João Almeida",
        "escola": "Instituto João",
        "cidade": "Salvador",
        "uf": "RJ",
        "status": "pending"
    },
    {
        "id": 33,
        "nomeResponsavel": "Paulo Costa",
        "escola": "Centro Educacional Carlos",
        "cidade": "Salvador",
        "uf": "SC",
        "status": "pending"
    },
    {
        "id": 34,
        "nomeResponsavel": "Paulo Almeida",
        "escola": "Instituto Rafael",
        "cidade": "Curitiba",
        "uf": "PR",
        "status": "pending"
    },
    {
        "id": 35,
        "nomeResponsavel": "Maria Costa",
        "escola": "Colégio Carlos",
        "cidade": "Curitiba",
        "uf": "RJ",
        "status": "pending"
    },
    {
        "id": 36,
        "nomeResponsavel": "Fernanda Rodrigues",
        "escola": "Instituto Paulo",
        "cidade": "Curitiba",
        "uf": "BA",
        "status": "pending"
    },
    {
        "id": 37,
        "nomeResponsavel": "Paulo Souza",
        "escola": "Escola João",
        "cidade": "Curitiba",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 38,
        "nomeResponsavel": "Carlos Oliveira",
        "escola": "Escola Juliana",
        "cidade": "São Paulo",
        "uf": "BA",
        "status": "paid"
    },
    {
        "id": 39,
        "nomeResponsavel": "Lucas Pereira",
        "escola": "Instituto Paulo",
        "cidade": "Florianópolis",
        "uf": "PE",
        "status": "pending"
    },
    {
        "id": 40,
        "nomeResponsavel": "Gabriela Silva",
        "escola": "Colégio Maria",
        "cidade": "Porto Alegre",
        "uf": "BA",
        "status": "paid"
    },
    {
        "id": 41,
        "nomeResponsavel": "Carlos Costa",
        "escola": "Escola Carlos",
        "cidade": "Florianópolis",
        "uf": "PR",
        "status": "paid"
    },
    {
        "id": 42,
        "nomeResponsavel": "Gabriela Rodrigues",
        "escola": "Centro Educacional Gabriela",
        "cidade": "Rio de Janeiro",
        "uf": "MG",
        "status": "paid"
    },
    {
        "id": 43,
        "nomeResponsavel": "Juliana Costa",
        "escola": "Instituto Lucas",
        "cidade": "Belo Horizonte",
        "uf": "RJ",
        "status": "paid"
    },
    {
        "id": 44,
        "nomeResponsavel": "Carlos Ferreira",
        "escola": "Instituto Carlos",
        "cidade": "Porto Alegre",
        "uf": "PR",
        "status": "pending"
    },
    {
        "id": 45,
        "nomeResponsavel": "Rafael Lima",
        "escola": "Centro Educacional João",
        "cidade": "Rio de Janeiro",
        "uf": "PR",
        "status": "pending"
    },
    {
        "id": 46,
        "nomeResponsavel": "Rafael Silva",
        "escola": "Colégio Paulo",
        "cidade": "São Paulo",
        "uf": "BA",
        "status": "paid"
    },
    {
        "id": 47,
        "nomeResponsavel": "Ana Almeida",
        "escola": "Colégio Maria",
        "cidade": "Salvador",
        "uf": "SC",
        "status": "pending"
    },
    {
        "id": 48,
        "nomeResponsavel": "Maria Rodrigues",
        "escola": "Centro Educacional Gabriela",
        "cidade": "Belo Horizonte",
        "uf": "MG",
        "status": "pending"
    },
    {
        "id": 49,
        "nomeResponsavel": "Lucas Costa",
        "escola": "Instituto João",
        "cidade": "Recife",
        "uf": "SP",
        "status": "pending"
    },
    {
        "id": 50,
        "nomeResponsavel": "Juliana Lima",
        "escola": "Centro Educacional Lucas",
        "cidade": "São Paulo",
        "uf": "PR",
        "status": "paid"
    }
];

export default contratosMock;