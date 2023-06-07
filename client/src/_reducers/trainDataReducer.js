const initialState = {
    trainno: null,
    charge: null,
    depart: null,
    arrival: null,
    traintype: null,
    error: null,
  };
  
  const trainDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "getTraindata":
        return {
          ...state,
          trainno: action.payload.trainno,
          charge: action.payload.charge,
          depart: action.payload.depart,
          arrival: action.payload.arrival,
          traintype: action.payload.traintype,
          error: null,
        };
      case "trainDataError":
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default trainDataReducer;
  