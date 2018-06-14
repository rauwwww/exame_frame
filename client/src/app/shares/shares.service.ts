import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Share } from '../models/share';
import { Observable }     from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ShareService {
    private getshareUrl = 'share/get';  // URL to web API
    private postShareUrl = 'share/post';  // URL to web API
    private postPriceUrl = 'share/sharePost';
    private deleteshareUrl = 'share/delete';
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;

    /*
     * Get blog messages from server
     */
    getShares (): Observable<Share[]> {
        let observable = new Observable(observer => {
            console.log('Socket:', this.url);
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                console.log('hello', data);
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    /*
     * Send blog message to server
     */
    addShare (share: Share): Observable<Share> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postShareUrl, share, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Send rate to server
     */
    addPrice(id, price): Observable<Share> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const priceData = {
            id: id,
            price: price,
            date: Date.now()
        };
        return this.http.post(this.postPriceUrl, priceData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Remove rate from server
     */
    removeShare(id): Observable<Share> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const shareId = {
            id: id
        };
        return this.http.post(this.deleteshareUrl, shareId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
