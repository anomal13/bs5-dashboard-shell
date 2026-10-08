import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { mountShell } from './shell/shell';

const destroy = mountShell();

// При HMR модуль перезапускается — старый shell должен убрать за собой всё
import.meta.hot?.dispose(() => destroy());
