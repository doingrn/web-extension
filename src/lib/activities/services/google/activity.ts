import { parseQuerystring } from '@/lib/utils/querystring';

const data = parseQuerystring(window.location.search);
alert(`Você pesquisou por ${data.q}`);
