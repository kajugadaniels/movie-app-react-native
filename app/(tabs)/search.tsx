import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/usefetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import MovieCard from '@/components/MovieCard'

const Search = () => {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }))

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute z-0 flex-1 w-full' resizeMode='cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})