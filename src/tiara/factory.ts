import { TrackObject } from './index';

export const TiaraSeeds = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
];

export namespace TiaraFactory {

    export function generateRandomUUIDWithDateTime(): string {
        const builder = [ 'w-' ];

        builder.push(shortenID(12));
        builder.push('_');
        builder.push(currentTimeStamp());

        return builder.join('');
    }

    export function generateRandomUUIDWithDateNumber(): string {
        const builder = [ 'w-' ];

        builder.push(shortenID(12));
        builder.push('_');
        builder.push(currentTimeStamp().substring(0, 6));
        builder.push(randomNumericString(9));

        return builder.join('');
    }

    export function currentTimeStamp(): string {
        const time = new Date();
        time.setHours(time.getHours() + 9);
        return time.toISOString().replace(/[TZ\-:.]/g, "").substring(2)
    }

    export function randomNumericString(length: number): string {
        let element = [];
        for (let i = 0; i < length; i++) {
            element.push(Math.floor(Math.random() * 10));
        }
        return element.join('');
    }

    export function shortenID(id: number) {
        let element = [];
        for (let i = 0; i < id; i++) {
            element.push(
                TiaraSeeds[Math.floor(Math.random() * TiaraSeeds.length)]
            );
        }
        return element.join('');
    }

    export function createTrackObject(): TrackObject {
        const tuid = generateRandomUUIDWithDateTime();
        const uuid = generateRandomUUIDWithDateNumber();

        return {
            sdk: {
                type: 'WEB',
                version: '1.1.28'
            },
            env: {
                screen: '2560X1440',
                tz: '+9',
                cke: 'Y'
            },
            common: {
                svcdomain: 'accounts.kakao.com',
                deployment: 'production',
                url: 'https://accounts.kakao.com/login/',
                section: 'login',
                page: 'page-login'
            },
            etc: {
                client_info: {
                    tuid,
                    tsid: tuid,
                    uuid: uuid,
                    suid: uuid,
                    isuid: generateRandomUUIDWithDateNumber(),
                    client_timestamp: Date.now()
                }
            },
            action: {
                type: 'Pageview',
                name: 'page-login',
                kind: ''
            }
        }
    }

}