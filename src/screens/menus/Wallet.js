import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../styles/GlobalStyles';
import Colors from '../../constants/Colors';
import {typography} from '../../styles/TypoGraphy';
import {
  getHeightPercentage,
  getResponsiveFontSize,
  getWidthPercentage,
} from '../../utils/Dimention';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';

const Wallet = () => {
  const [amount, setAmount] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDocumentModalVisible, setDocumentModalVisible] = useState(false);
  const [documentType, setDocumentType] = useState('PAN Card');
  const [panNumber, setPanNumber] = useState('');
  const [panHolderName, setPanHolderName] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [licenseName, setLicenseName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportName, setPassportName] = useState('');
  const [voteid, setVoteId] = useState('');
  const [voteName, setVoteName] = useState('');

  const handleTopup = () => {
    if (amount) {
      setModalVisible(true);
    }
  };

  const handleDocumentChange = type => {
    setDocumentType(type);
    setDocumentModalVisible(false);
  };

  const renderDocumentFields = () => {
    switch (documentType) {
      case 'PAN Card':
        return (
          <>
            <CustomTextInput
              label="PAN Number"
              labelStyle={styles.label}
              value={panNumber}
              onChangeText={setPanNumber}
              keyboardType="default"
              inputStyle={styles.input}
            />
            <CustomTextInput
              label="PAN Holder Name"
              labelStyle={styles.label}
              value={panHolderName}
              onChangeText={setPanHolderName}
              keyboardType="default"
              inputStyle={styles.input}
            />
          </>
        );
      case 'Driving License':
        return (
          <>
            <CustomTextInput
              label="License Number"
              labelStyle={styles.label}
              value={drivingLicense}
              onChangeText={setDrivingLicense}
              keyboardType="default"
              inputStyle={styles.input}
            />
            <CustomTextInput
              label="License Name"
              labelStyle={styles.label}
              value={licenseName}
              onChangeText={setLicenseName}
              keyboardType="default"
              inputStyle={styles.input}
            />
          </>
        );
      case 'Passport':
        return (
          <>
            <CustomTextInput
              label="Passport ID"
              labelStyle={styles.label}
              value={passportNumber}
              onChangeText={setPassportNumber}
              keyboardType="default"
              inputStyle={styles.input}
            />
            <CustomTextInput
              label="Passport Name"
              labelStyle={styles.label}
              value={passportName}
              onChangeText={setPassportName}
              keyboardType="default"
              inputStyle={styles.input}
            />
          </>
        );
      case 'Voter ID Card':
        return (
          <>
            <CustomTextInput
              label="Voter ID"
              labelStyle={styles.label}
              value={voteid}
              onChangeText={setVoteId}
              keyboardType="default"
              inputStyle={styles.input}
            />
            <CustomTextInput
              label="Voter Name"
              labelStyle={styles.label}
              value={voteName}
              onChangeText={setVoteName}
              keyboardType="default"
              inputStyle={styles.input}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.card}>
        <Text style={[typography.body, {fontWeight: 'bold'}]}>Low Balance</Text>
        <View style={styles.balance}>
          <Image
            source={require('../../assets/images/Rupee.png')}
            style={styles.imageprfo}
          />
          <Text
            style={[
              typography.body,
              {marginTop: 1, paddingLeft: 5, fontSize: 27},
            ]}>
            0
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={typography.heading6}>Topup Wallet</Text>
          <CustomTextInput
            imageSource={require('../../assets/images/Rupee.png')}
            placeholder="Enter Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            inputStyle={styles.input}
          />
          <View style={styles.button}>
            <CustomButton title="PROCEED TO TOPUP" onPress={handleTopup} />
          </View>
        </View>
      </View>

      {/* Main Modal for Document Fields */}
      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Please submit the following details to add money to your wallet">
        {/* Document Type Selection */}

        <View style={styles.modalField}>
          <Text style={styles.modalLabel}>Document Type</Text>
          <TouchableOpacity onPress={() => setDocumentModalVisible(true)}>
            <Text style={styles.modalValue}>
              <Text style={[typography.smallbody, {color: Colors.primary}]}>
                Change
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={typography.body}>{documentType}</Text>

        {/* Render Fields Based on Document Type */}
        {renderDocumentFields()}

        <View style={styles.button}>
          <CustomButton title="Submit" onPress={() => setModalVisible(false)} />
        </View>
      </CustomModal>

      {/* Secondary Modal for Document Type Selection */}
      <CustomModal
        isVisible={isDocumentModalVisible}
        onClose={() => setDocumentModalVisible(false)}
        title="Select Document Type">
        <FlatList
          data={['PAN Card', 'Driving License', 'Voter ID Card', 'Passport']}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.documentOption}
              onPress={() => handleDocumentChange(item)}>
              <Text style={typography.smallbody}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </CustomModal>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  imageprfo: {
    width: getWidthPercentage(5),
    height: getHeightPercentage(5),
    resizeMode: 'contain',
  },
  balance: {
    flexDirection: 'row',
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
  },
  input: {
    color: Colors.black,
    fontSize: getResponsiveFontSize(18),
    right: 10,
    top: 3,
  },
  button: {
    marginTop: 20,
  },
  modalField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  modalValue: {
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  documentOption: {
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.grey,
  },
});