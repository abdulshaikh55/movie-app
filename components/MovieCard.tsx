import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({ id, title, poster_path, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={{
            uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/ffffff.png'
          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>{title}</Text>

        <View className='flex-row items-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4' />
          <Text className="text-white text-xs uppercase font-bold">{Math.round(vote_average / 2)}</Text>
        </View>

        <View className='flex-row items-center justify-between'>
          <Text className='text-xs text-light-300 font-medium mt-1'>
            {release_date.split('-')[0]}
          </Text>
          {/* <Text className='text-xs text-light-300 font-medium uppercase'>
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard;