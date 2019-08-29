import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

export interface ISearchResultItem  {
    answer_count: number;
    closed_date: number;
    closed_reason: string;
    creation_date: number;
    is_answered: boolean;
    last_activity_date: number;
    link: string;
    score: number;
    tags: Array<string>;
    title: string;
    view_count: number;
}

@Injectable()
export class SearchService {

    constructor(private http: Http) {

    }

    search(keyword: string, page: number): Observable<ISearchResultItem[]> {
        let apiUrl =
        `https://api.stackexchange.com/2.2/search?pagesize=${page}&order=desc&sort=activity&site=stackoverflow&intitle=`;

        return this.http.get(apiUrl + keyword)
            .map((res: Response) => {
                let data = res.json();
                console.log("API USAGE: " + data.quota_remaining + " of " + data.quota_max + " requests available" );
                let items: ISearchResultItem[] = data.items; 
                return items;
            })
            .catch((err: Response) => Observable.of(err.json()));
    }

}
