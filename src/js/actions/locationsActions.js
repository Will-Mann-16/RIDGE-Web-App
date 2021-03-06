/*jshint esversion: 6 */
import {emit, connected} from './../socket.js';
import {axiosOpen} from '../constants';
import {readStudentsMajor} from "./studentsActions";

export function createLocation(location, house) {
    return dispatch => {
        dispatch({type: 'CREATE_LOCATION'});
        axiosOpen
            .post('locations/create', {
                location: location,
                house: house
            }, {headers: {'X-Access-Token': localStorage.getItem('RIDGE-AUTH-TOKEN')}})
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    if (connected) {
                        emit('socket-client-server-redraw-major');
                    }
                    else {
                        dispatch(readStudentsMajor(house));
                        dispatch(readLocations(house));
                    }
                    dispatch({
                        type: 'CREATE_LOCATION_FULFILLED',
                        payload: response.data.success
                    });
                } else {
                    dispatch({
                        type: 'CREATE_LOCATION_REJECTED',
                        payload: response.data.reason
                    });
                }
            })
            .catch(err => {
                dispatch({type: 'CREATE_LOCATION_REJECTED', payload: err});
            });
    };
}

export function readLocations(house) {
    return dispatch => {
        dispatch({type: 'READ_LOCATIONS'});
        axiosOpen
            .get('locations/read', {
                params: {house: house},
                headers: {'X-Access-Token': localStorage.getItem('RIDGE-AUTH-TOKEN')}
            })
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    dispatch({
                        type: 'READ_LOCATIONS_FULFILLED',
                        payload: response.data.locations
                    });
                } else {
                    dispatch({
                        type: 'READ_LOCATIONS_REJECTED',
                        payload: response.data.reason
                    });
                }
            })
            .catch(err => {
                dispatch({type: 'READ_LOCATIONS_REJECTED', payload: err});
            });
    };
}

export function updateLocation(id, location, house) {
    return dispatch => {
        dispatch({type: 'UPDATE_LOCATION'});
        axiosOpen
            .post('locations/update', {
                id: id,
                location: location,
                house: house
            }, {headers: {'X-Access-Token': localStorage.getItem('RIDGE-AUTH-TOKEN')}})
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    if (connected) {
                        emit('socket-client-server-redraw-major');
                    }
                    else {
                        dispatch(readStudentsMajor(house));
                        dispatch(readLocations(house));
                    }
                    dispatch({
                        type: 'UPDATE_LOCATION_FULFILLED',
                        payload: response.data.location
                    });
                } else {
                    dispatch({
                        type: 'UPDATE_LOCATION_REJECTED',
                        payload: response.data.reason
                    });
                }
            })
            .catch(err => {
                dispatch({type: 'UPDATE_LOCATION_REJECTED', payload: err});
            });
    };
}

export function deleteLocation(id, house) {
    return dispatch => {
        dispatch({type: 'DELETE_LOCATION'});
        axiosOpen
            .get('locations/delete', {
                params: {id: id, house: house},
                headers: {'X-Access-Token': localStorage.getItem('RIDGE-AUTH-TOKEN')}
            })
            .then(response => {
                if (response.status === 200 && response.data.success) {
                    if (connected) {
                        emit('socket-client-server-redraw-major');
                    }
                    else {
                        dispatch(readStudentsMajor(house));
                        dispatch(readLocations(house));
                    }
                    dispatch({
                        type: 'DELETE_LOCATION_FULFILLED',
                        payload: response.data.success
                    });
                } else {
                    dispatch({
                        type: 'DELETE_LOCATION_REJECTED',
                        payload: response.data.reason
                    });
                }
            })
            .catch(err => {
                dispatch({type: 'DELETE_LOCATION_REJECTED', payload: err});
            });
    };
}
