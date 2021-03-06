import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

const appKey = 'vngL2peLDHaT2XgHUyry8vYv5lezpAlj';

export const environment: MyCarEnvironment = {
	production: true,
	apiBaseUrl: 'https://mycar.murphyauto.net/api/v2',
	oauthProviderUrl: `https://mycar.murphyauto.net/api/v2/auth/login?appkey=${appKey}`,
	httpOptions: {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH',
			// 'Access-Control-Allow-Headers': 'Authorization, x-appkey',

			'x-appkey': appKey
		})
	},
	googleAnalytics: {
		domain: 'auto',
		trackingId: 'UA-10667959-7'
	}
};
