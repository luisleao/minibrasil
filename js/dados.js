

	var desafios = null;






	var estados = [
		{ "sigla": "RS", "name": "Rio Grande do Sul", "location": { "lng": -51.229153, "lat": -30.033915 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "SC", "name": "Santa Catarina", "location": { "lng": -48.543736, "lat": -27.593237 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PA", "name": "Paraná", "location": { "lng": -49.271469, "lat": -25.433170 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "MS", "name": "Mato Grosso do Sul", "location": { "lng": -54.612236, "lat": -20.461720 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "MT", "name": "Mato Grosso", "location": { "lng": -56.094894, "lat": -15.598917 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "GO", "name": "Goiás", "location": { "lng": -49.255032, "lat": -16.679920 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "DF", "name": "Distrito Federal", "location": { "lng": -47.863712, "lat": -15.799830 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "MG", "name": "Minas Gerais", "location": { "lng": -43.940102, "lat": -19.918339 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "ES", "name": "Espirito Santo", "location": { "lng": -40.336296, "lat": -20.319933 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RJ", "name": "Rio de Janeiro", "location": { "lng": -43.177139, "lat": -22.908892 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "SP", "name": "São Paulo", "location": { "lng": -46.633106, "lat": -23.550484 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PI", "name": "Piauí", "location": { "lng": -42.810154, "lat": -5.092628 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "CE", "name": "Ceará", "location": { "lng": -38.521778, "lat": -3.730536}, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RN", "name": "Rio Grande do Norte", "location": { "lng": -35.207977, "lat": -5.786403 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PB", "name": "Paraíba", "location": { "lng": -34.876209, "lat": -7.120034 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PE", "name": "Pernambuco", "location": { "lng": -34.881256, "lat": -8.054278 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AL", "name": "Alagoas", "location": { "lng": -35.737957, "lat": -9.667137 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "SE", "name": "Sergipe", "location": { "lng": -37.053452, "lat": -10.912647 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "BA", "name": "Bahia", "location": { "lng": -38.512383, "lat": -12.970382 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RO", "name": "Rondônia", "location": { "lng": -63.903942, "lat": -8.764597 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AC", "name": "Acre", "location": { "lng": -67.812752, "lat": -9.972463 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AM", "name": "Amazonas", "location": { "lng": -60.020164, "lat": -3.133842 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "RR", "name": "Roraima", "location": { "lng": -60.672062, "lat": 2.821734 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "PA", "name": "Pará", "location": { "lng": -48.503071, "lat": -1.452005 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "AP", "name": "Amapá", "location": { "lng": -51.050098, "lat": 0.039045 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		{ "sigla": "TO", "name": "Tocantins", "location": { "lng": -48.333652, "lat": -10.184567 }, "pib": 0, "municipios": 0, "exportacoes": 0, "importacoes": 0, "empresas": 0},
		//TODO: falta MARANHÃO!!!
	];



	var siglas = {
		"RS": {},
		"SC": {},
		"PA": {},
		"MS": {},
		"MT": {},
		"GO": {},
		"DF": {},
		"MG": {},
		"ES": {},
		"RIO DE JANEIRO": {},
		"SÃO PAULO": {},
		"PR": {},
		"PI": {},
		"CE": {},
		"RN": {},
		"PB": {},
		"PE": {},
		"AL": {},
		"SE": {},
		"BA": {},
		"RO": {},
		"AC": {},
		"AM": {},
		"RR": {},
		"PA": {},
		"AP": {},
		"TO": {},
		"MA": {}
	};


	for (sigla in siglas) {
		siglas[sigla].pib = Math.floor(Math.random() * 5000000);
	}



