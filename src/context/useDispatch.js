import { GlobalContext } from './Provider';
import { useContextSelector } from 'use-context-selector';

const useDispatch = keySelector => useContextSelector(GlobalContext, v => v[keySelector]);

export default useDispatch;
