updatePoints();
function updatePoints() {

    const { google } = require('googleapis');
    const keys = require('/Users/vithulravivarma/MathnasiumApp/Mathnasium/Keys.json')


    // google sheets api - javascript nodejs tutorial
    // https://nodejs.org/en/
    // https://code.visualstudio.com/docs/?dv=win
    // https://developers.google.com/sheets/api/quickstart/nodejs
    // console.developers.google.com
    // https://www.googleapis.com/auth/spreadsheets

    // Google sheet name 'sheet-test' under varmathams@gmail.com

    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    client.authorize(function (err) {

        if (err) {
            console.log(err);
            return;
        } else {
            console.log('connected');
            readAndEditSheet(client);
        }

    });

    async function readAndEditSheet(authClient) {

        const gsapi = google.sheets({ version: 'v4', auth: authClient });

        //IDs from Data From Today
        const idsPoints = {
            spreadsheetId: '1dZ0nXkkSDKRbFak1osm4Ekq3F2VdX-xPMmlI6Do7J1w',
            range: 'Data From Today!A2:A100'

        };
        //IDs from Data Mastersheet
        const idsTotalPoints = {
            spreadsheetId: '1dZ0nXkkSDKRbFak1osm4Ekq3F2VdX-xPMmlI6Do7J1w',
            range: 'Data Mastersheet!A2:A100',
        };
        //points from Data From Today
        const points = {
            spreadsheetId: '1dZ0nXkkSDKRbFak1osm4Ekq3F2VdX-xPMmlI6Do7J1w',
            range: 'Data From Today!C2:C100'
        };
        //points from Data Mastersheet
        const totalPoints = {
            spreadsheetId: '1dZ0nXkkSDKRbFak1osm4Ekq3F2VdX-xPMmlI6Do7J1w',
            range: 'Data Mastersheet!C2:C100'
        };
        let totalPointsValue = await gsapi.spreadsheets.values.get(totalPoints);
        let totalPointsArray = totalPointsValue.data.values;
        for (i = 0; i < totalPointsArray.length; i++) {
            totalPointsArray[i] = parseInt(totalPointsArray[i], 10);
        }
        //console.log(totalPointsArray);

        let pointsValue = await gsapi.spreadsheets.values.get(points);
        let pointsArray = pointsValue.data.values;
        for (i = 0; i < pointsArray.length; i++) {
            pointsArray[i] = parseInt(pointsArray[i], 10);
        }

        //Get student data sheet
        let range;
        let pointsId = await gsapi.spreadsheets.values.get(idsPoints);
        let pointsIdArray = pointsId.data.values;
        //console.log(pointsIdArray);
        let totalPointsId = await gsapi.spreadsheets.values.get(idsTotalPoints);
        let totalPointsIdArray = totalPointsId.data.values;
        for (i = 0; i < pointsIdArray.length; i++) {
            for (j = 0; j < totalPointsIdArray.length; j++) {
                if ((parseInt(pointsIdArray[i], 10) == parseInt(totalPointsIdArray[j], 10))) {
                    range = "Data Mastersheet!C" + (j + 2);
                    totalPointsArray[j] += pointsArray[i];
                    updateLiveschoolPoints(range, totalPointsArray[j], gsapi);
                }
            }
        }
    }

    function updateLiveschoolPoints(range, dataToUpdate, gsapi) {
        const updater = {
            spreadsheetId: '1dZ0nXkkSDKRbFak1osm4Ekq3F2VdX-xPMmlI6Do7J1w',
            range: range,
            valueInputOption: 'USER_ENTERED',
            resource: { values: [[dataToUpdate]] }
        };

        let res = gsapi.spreadsheets.values.update(updater);

    }
}