// // import jose
// import { decodeJwt } from "jose";
// import lodash from "lodash";
// import admin from "../lib/firebase-admin-app";

// export function withAuth(handler) {
//     return async (req, res) => {
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res
//                 .status(401)
//                 .json({ success: false, error: "Not authenticated" });
//         }

//         const token = authHeader.split(" ")[1];

//         if (!token) {
//             return res
//                 .status(401)
//                 .json({ success: false, error: "Not authenticated. No token" });
//         }

//         const decodedToken = decodeJwt(token);

//         if (!decodedToken) {
//             return res
//                 .status(401)
//                 .json({ success: false, error: "Not authenticated. Invalid token" });
//         }

//         const { user_id } = decodedToken;

//         if (!user_id) {
//             return res
//                 .status(401)
//                 .json({ success: false, error: "Not authenticated. Invalid user" });
//         }

//         const user = await admin.auth().getUser(user_id);

//         if (!user) {
//             return res
//                 .status(401)
//                 .json({ success: false, error: "Not authenticated. Invalid user" });
//         }

//         req.user = lodash.pick(user, ["user_id", "email"]);


//         return handler(req, res);
//     };
// }