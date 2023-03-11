/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { requestOptions } from "@b2bsample/business-admin-app/data-access/data-access-common-api-util";
import { dataNotRecievedError, notPostError } from "@b2bsample/shared/data-access/data-access-common-api-util";
import { getOrgUrl } from "@b2bsample/shared/util/util-application-config-util";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * backend API call to view users
 * 
 * @param req - request
 * @param res - response
 * 
 * @returns correct data if the call is successful, else an error message
 */
export default async function viewUsers(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        notPostError(res);
    }

    const body = JSON.parse(req.body);
    const session = body.session;
    const orgId = body.orgId;

    try {
        const fetchData = await fetch(
            `${getOrgUrl(orgId)}/scim2/Users?count=100`,
            requestOptions(session)
        );
        const users = await fetchData.json();

        res.status(200).json(users);
    } catch (err) {

        return dataNotRecievedError(res);
    }
}
