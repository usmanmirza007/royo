// import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
// import React, { useState } from 'react'
// import CustomTextInput from '../components/CustomTextInput'
// import CustomButton from '../components/CustomButton';
// import PhonepeSDK from 'react-native-phonepe-pg';
// import Base64 from 'react-native-base64';
// import sha256 from 'sha256';


// const PaymentScreen = () => {

//     const [data, setData] = useState({
//         mobile: "",
//         amount: ""
//     });

//     const [environment, setEnvironment] = useState("SANDBOX");
//     const [merchantId, setMerchantID] = useState("PGTESTPAYUAT86");
//     const [appId, setAppID] = useState(null);
//     const [enableLogging, setEnableLogging] = useState(true);

//     const generateTransactionId = () => {
//         const timestamp = Date.now();
//         const random = Math.floor(Math.random() * 1000000);
//         const merchantprefix = "T";
//         return `${merchantprefix}${timestamp}${random}`;
//     }

//     const SubmitHandler = () => {
//         PhonepeSDK.init(environment, merchantId, appId, enableLogging).then(resp => {
//             const requestBody = {
//                 merchantId: merchantId,
//                 merchantTransactionId: generateTransactionId(),
//                 merchantUserId: "",
//                 amount: (data.amount * 100),
//                 mobileNumber: data.mobile,
//                 callbackUrl: "http://www.example.com/callback",
//                 paymentInstrument: {
//                     type: "PAY_PAGE"
//                 }
//             };

//             const salt_key = "96434309-7796-489d-8924-ab56988a6076";
//             const salt_Index = 1;
//             const payload = JSON.stringify(requestBody);
//             const payload_main = Base64.encode(payload);
//             const string = payload_main + "/pg/v1/pay" + salt_key;
//             const checksum = sha256(string) + "###" + salt_Index;

//             // Initiate the payment transaction
//             PhonepeSDK.startTransaction(payload_main, checksum, null, null).then(resp => {
//                 console.log("Transaction started successfully:", resp);
//             }).catch(err => {
//                 console.log("Error in starting transaction:", err);
//             });

//         }).catch(err => {
//             console.log("Error in PhonePe SDK initialization:", err);
//         });

//     }

//     return (
//         <View>
//             <SafeAreaView>
//                 <View style={styles.container}>
//                     <CustomTextInput
//                         placeholder={"Enter Mobile number:"}
//                         onChangeText={(txt) => setData({ ...data, mobile: txt })}
//                         style={styles.textfield}
//                     />
//                     <CustomTextInput
//                         placeholder={"Enter Amount:"}
//                         onChangeText={(txt) => setData({ ...data, amount: txt })}
//                         style={styles.textfield}
//                     />
//                     <CustomButton title={"Pay"} onPress={SubmitHandler} />
//                 </View>
//             </SafeAreaView>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//         gap: 10
//     },
//     textfield: {
//         padding: 15,
//         borderColor: "grey",
//         borderWidth: 1,
//         width: "90%"
//     }
// });

// export default PaymentScreen;


import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import PhonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64';
import sha256 from 'sha256';

const PaymentScreen = () => {

    const [data, setData] = useState({
        mobile: "",
        amount: ""
    });

    const [environment, setEnvironment] = useState("PRODUCTION");
    const [merchantId, setMerchantID] = useState("CULTIVATEONLINE");
    const [appId, setAppID] = useState(null); // Use null if you don't need an App ID
    const [enableLogging, setEnableLogging] = useState(true);

    const generateTransactionId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const merchantprefix = "T";
        return `${merchantprefix}${timestamp}${random}`;
    }

    const SubmitHandler = () => {
        PhonepeSDK.init(environment, merchantId, appId, enableLogging).then(resp => {
            const requestBody = {
                merchantId: merchantId,
                merchantTransactionId: generateTransactionId(),
                merchantUserId: "",
                amount: (data.amount * 100), // Convert to paise
                mobileNumber: data.mobile,
                callbackUrl: "https://cultivatepie.com/api/callback",
                paymentInstrument: {
                    type: "PAY_PAGE"
                }
            };

            const salt_key = "692f62e6-e271-4a58-b741-5a5ce99ce2c2";
            const salt_Index = 1;
            const payload = JSON.stringify(requestBody);
            const payload_main = Base64.encode(payload);
            const string = payload_main + "/pg/v1/pay" + salt_key;
            const checksum = sha256(string) + "###" + salt_Index;

            // Initiate the payment transaction
            PhonepeSDK.startTransaction(payload_main, checksum, null, null).then(resp => {
                console.log("Transaction started successfully:", resp);
            }).catch(err => {
                console.log("Error in starting transaction:", err);
            });

        }).catch(err => {
            console.log("Error in PhonePe SDK initialization:", err);
        });
    }

    return (
        <View>
            <SafeAreaView>
                <View style={styles.container}>
                    <CustomTextInput
                        placeholder={"Enter Mobile number:"}
                        onChangeText={(txt) => setData({ ...data, mobile: txt })}
                        style={styles.textfield}
                    />
                    <CustomTextInput
                        placeholder={"Enter Amount:"}
                        onChangeText={(txt) => setData({ ...data, amount: txt })}
                        style={styles.textfield}
                    />
                    <CustomButton title={"Pay"} onPress={SubmitHandler} />
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 10
    },
    textfield: {
        padding: 15,
        borderColor: "grey",
        borderWidth: 1,
        width: "90%"
    }
});

export default PaymentScreen;
