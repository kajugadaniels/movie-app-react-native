import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const SearchBar = () => {
    return (
        <View className="flex-row items-center px-5 py-4 rounded-full bg-darl-200">
            <Image source={icons.search} className='resize' resizeMode='contain' tintColor='#ab8bff' />

            <TextInput
                onPress={() => {}}
                placeholder='Search'
                value=''
                onChangeText={() => {}}
                placeholderTextColor="#a8b5db"
                className='flex-1 ml-2 text-white'
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})