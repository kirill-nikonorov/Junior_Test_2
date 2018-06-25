import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {reducer as companyOrientationsReducer} from '../../lib/symbiote/companyOrientations';
import {reducer as tokenReducer} from '../../lib/symbiote/token';

const rootReducer = combineReducers({
    companyOrientations: companyOrientationsReducer,
    token: tokenReducer,
    form: formReducer
});

export default rootReducer;
