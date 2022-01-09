import { GlobalContext } from './Provider';
import { useContextSelector } from 'use-context-selector';

const useSelector = keyValue => useContextSelector(GlobalContext, v => v[keyValue]);

export default useSelector;
