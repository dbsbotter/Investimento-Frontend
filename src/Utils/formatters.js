export const dinheiro = (value, symbol) => {
  let simbolo = symbol;
  let valor = Math.round(value * 10 ** 2) / 10 ** 2;
  const args = String(valor).split('.');
  const milhar = formataValor(args[0]);
  let decimal = '00';
  if (value < 0 && milhar === '0') {
    simbolo = `${symbol} -`;
  }

  if (typeof args[1] !== 'undefined') {
    decimal = formataDecimal(args[1]);
  }

  valor = simbolo ? `${simbolo} ${milhar},${decimal}` : `${milhar},${decimal}`;

  return valor;
};

const formataValor = (value) => {
  let ret = value;

  if (Number.isNaN(Number(ret))) ret = '0';

  ret = Math.floor((ret * 100 + 0.5) / 100).toString();

  for (let i = 0; i < Math.floor((ret.length - (1 + i)) / 3); i += 1) {
    ret = `${ret.substring(0, ret.length - (4 * i + 3))}.${ret.substring(
      ret.length - (4 * i + 3),
    )}`;
  }
  return ret;
};

const formataDecimal = (value) => {
  const ret = value.length === 1 ? `${String(value)}0` : value;
  return ret;
};
