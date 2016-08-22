import { sequence } from './promiseUtils';


export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.needs || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.needs !== current.needs)) ?
        current.WrappedComponent.needs : [])
      .concat(prev)
  }, []);

  /*const promises = needs.map(need => {
    return dispatch(need(params))
  });

  return Promise.all(promises);*/

  return sequence(needs, need => dispatch(need(params)));
}
