import moment from 'moment';

export function getMin(bossTimer:any) {
    var now = moment(new Date());
			var end = moment(bossTimer?.timed);
			var duration = moment.duration(now.diff(end));
			var minutes =  bossTimer.respawn - duration.asMinutes();
			return Math.round(minutes);
}


export function groupBy(xs:any[], key:string): Map<string, any> {
	return xs.reduce(function(rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
		}, {});
}


