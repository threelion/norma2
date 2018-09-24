import { Observable } from 'rxjs/Observable';

export const authError = new Observable((observer) => {
	observer.next({
		msg: "Authentication failed",
		status: 401
	});
	observer.complete();
})

export const apiError = new Observable((observer) => {
	observer.next({
		msg: "Server error",
		status: 500
	});
	observer.complete();
})

export const handleError = (error: any) =>{
		console.log(error);

		if (error.status == 401) {
			return authError.toPromise();
		} else {
			return apiError.toPromise();
		}
}