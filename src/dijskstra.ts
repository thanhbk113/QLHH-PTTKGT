export const inDuongDi = (
  s: number,
  f: number,
  previous: number[],
  d: number[]
) => {
  console.log(`Duong di tu ${s} den ${f} la:`);
  let k = f;
  console.log(f);
  while (k !== s) {
    console.log(`<- ${previous[k]}`);
    k = previous[k];
  }
  console.log(`Khoang cach ${d[f]}`);
};

const graph = [
  [0, 2, 0, 5, 0, 0],
  [0, 0, 7, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0],
];

let d: number[] = []; //luu khoan cach nho nhat giua cac dinh
let previous: number[] = [];
let daDuyet: number[] = [];

export const dinhChuaDuyetvaKcbeNhat = () => {
  let u = -1; //dinh can tim
  let min = 9999;
  for (let i = 0; i < graph.length; i++) {
    if (daDuyet[i] === 0 && d[i] < min) {
      u = i;
      min = d[i];
    }
  }
  return u;
};

export const Dijkstra = () => {
  for (let i = 0; i < graph.length; i++) {
    d[i] = 9999;
    previous[i] = -1;
    daDuyet[i] = 0;
  }
  d[0] = 0;
  let soDinhDaDuyet = graph.length;
  let u;
  while (soDinhDaDuyet > 0) {
    u = dinhChuaDuyetvaKcbeNhat();
    if (u === -1) break;
    daDuyet[u] = 1;
    for (let v = 0; v < graph.length; v++) {
      if (daDuyet[v] === 0 && graph[u][v] !== 0 && d[v] > d[u] + graph[u][v]) {
        d[v] = d[u] + graph[u][v];
        previous[v] = u;
      }
    }
    soDinhDaDuyet--;
  }
};
