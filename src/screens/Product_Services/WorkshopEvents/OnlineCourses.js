import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../../../styles/GlobalStyles'
import CourseCustomBox from '../../../components/CourseCustomBox'

const OnlineCourses = ({navigation}) => {

  const data = [
    {
      id :1,
      title : 'Introduction to Financial Management',
      description : 'This introductory course will help agribusiness owners familiarize themselves with financial management concepts and understand the importance of effectively managing their business finances.',
      duration : '15 minutes',
      point1 : 'Define financial management',
      point2 : 'Understand key financial management terminology',
      point3 : 'Describe the economic impact of agribusinesses in the agricultural sector',
      point4 : 'Explain the benefits of sound financial management',
      point5 : 'Recognize the advantages of working with a mentor to enhance financial decision-making',
    },
    {
      id :2,
      title : 'Financial Planning',
      description : 'This introductory financial planning course provides an understanding of essential financial planning concepts for agribusiness owners.',
      duration : '30 minutes',
      point1 : 'Financial planning terminology',
      point2 : 'How to improve your personal credit score',
      point3 : 'How to establish business credit for your agribusiness',
      point4 : 'The benefits of obtaining supplier diversity certification',
      point5 : 'The importance of working with a mentor to achieve your financial goals',
    },
    {
      id :3,
      title : 'Financial Record Keeping',
      description : 'This course introduces agribusiness owners to the essential practice of financial record keeping.',
      duration : '30 minutes',
      point1 : 'Financial record keeping for agribusiness',
      point2 : 'The benefits of maintaining accurate financial records',
      point3 : 'Types of technology used for financial record keeping',
      point4 : 'Best practices for keeping financial records',
      point5 : 'The purpose and significance of Profit & Loss (P&L), balance sheets, and cash flow statements',
      point6 : 'The importance of working with a bookkeeper'
    },
    {
      id :4,
      title : 'Access to Capital',
      description : 'This introductory course explores various traditional and non-traditional funding options that can help agribusiness owners secure the capital needed to grow and sustain their business.',
      duration : '30 minutes',
      point1 : 'Define capital and its role in agribusiness',
      point2 : 'Understand the benefits of accessing capital',
      point3 : 'Explore traditional and non-traditional funding options',
      point4 : 'Select the appropriate funding option(s) based on specific business needs',
      point5 : 'Understand the importance of building a relationship with a banker',
    },
    {
      id :5,
      title : 'Taxation Compliance',
      description : 'This introductory course highlights the significance of tax compliance for agribusiness owners.',
      duration : '15 minutes',
      point1 : 'Define taxation as it relates to agribusiness',
      point2 : 'Recognize the importance of tax compliance',
      point3 : 'Identify relevant national, state, and local taxes for agribusinesses',
      point4 : 'Understand the role of a tax professional in maintaining compliance',
    },

  ]

  const handlePress = (item) =>{
    console.log('CardClick', item)
    navigation.navigate('CourseLanding',{items:item})
  }

  return (
    <View style={globalStyles.container}>
      <CourseCustomBox data={data} onPress={handlePress} />
    </View>
  )
}

export default OnlineCourses

const styles = StyleSheet.create({})