import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {typography} from '../styles/TypoGraphy';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomModal = ({isVisible, onClose, title, children}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalheader}>
            <Text style={typography.heading6}>{title}</Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={28}
                color={Colors.black}
                bottom={10}
                left={5}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  modalContent: {
    marginBottom: 20,
    width: '100%',
  },
  modalheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
});

export default CustomModal;