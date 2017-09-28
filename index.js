var fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');
const departamentos = [], provincias = [], distritos = [];

data.split('\n') // separa linea x linea
    .map(line => line.replace(/"/g, '')) // quita las comillas del final
    .map(line => line.split(' / ')) // separa por /
    .forEach(parte => {
        parte.forEach((subparte, index) => {
            if (subparte.length > 3) {
                const info = subparte.replace(' ', '@').split('@'); // separa por primer espacio
                const info_padre = index > 0 && parte[index - 1].replace(' ', '@').split('@');
                const o = {
                    codigo: info[0],
                    descripcion: info[1],
                    codigo_padre: (info_padre && info_padre[0]) ? info_padre[0] : '-',
                    descripcion_padre: '-',
                };
                if (index === 0 && !departamentos.some(v => v.codigo === info[0])) {
                    departamentos.push(o);
                } else if (index === 1 && !provincias.some(v => v.codigo === info[0])) {
                    provincias.push(o);
                } else if (index === 2 && !distritos.some(v => v.codigo === info[0])) {
                    distritos.push(o);
                }
            }
        });
    });

console.log('DEPARTAMENTOS');
console.log(departamentos);
console.log('PROVINCIAS');
console.log(provincias.map(p =>Object.assign(p, {descripcion_padre: departamentos.find(d => d.codigo === p.codigo_padre).descripcion})));
console.log('DISTRITOS');
console.log(distritos.map(p =>Object.assign(p, {descripcion_padre: provincias.find(d => d.codigo === p.codigo_padre).descripcion})));