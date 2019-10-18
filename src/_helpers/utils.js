export class Utils {
    static handleResponse(response){
        return new Promise((resolve, reject) => {
            if (response.ok) {
                try{
                    response.json()
                    .then(json => resolve(json))
                    .catch(err => {
                        console.log("Invalid response headers/content")
                        // ignoring response type/msg in case of 200 status
                        resolve("Success");
                    });
                }catch(e){
                    reject("Invalid response");
                }
            } else {
                // return error message from response body
                response.text().then(text => reject(text));
            }
        });
    }

    static handleError(error = {}) {
        return Promise.reject(error.message || error);
    }

    static search(keyword, list){
        if(!keyword.length) return list;
        let orders = list.filter(item => {
            return item.PONumber.indexOf(keyword) > -1;
        })
        return orders;
    }
}
