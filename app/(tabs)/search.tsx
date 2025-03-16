import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/usefetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if(searchQuery.trim()) {
        await loadMovies();
      } else {
        reset()
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery])

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
        ListHeaderComponent={
          <>
            <View className='flex-row items-center justify-center w-full mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar
                placeholder='Search movies'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}

            {error && (
              <Text className='px-5 my-3 text-red-500'>
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold text-white">
                Search Results for {' '}
                <Text className='text-accent'>
                  {searchQuery}
                </Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5 mt-10">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})