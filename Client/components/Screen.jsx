import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'; 
import axios from 'axios';
import {Toast} from 'toastify-react-native';

export default function Screen() {
  const defaultUrl = 'https://www.youtube.com/watch?v=c1GMcr2x4dI';
  const [videoUrl, setVideoUrl] = useState('');
  const [commentData, setCommentData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [borderColor, setBorderColor] = useState('border-gray-400');


  
  useEffect(() => {
    Toast.success('Use Link  < 1 m View', {
      width: '200%', 
      duration: 8000,
      textStyle: {
        fontSize: 10, 
      },
    });
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.post(
          'https://sentiment-cyan.vercel.app/analyze',
          {url: defaultUrl},
        );
        const dataForPieChart = [
          {name: 'Positive Comments', value: response.data.positive_comments},
          {name: 'Negative Comments', value: response.data.negative_comments},
        ];
        setPieChartData(dataForPieChart);
        setCommentData(response.data);
      } catch (error) {
        console.error('Error fetching default data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!videoUrl) {
      alert('Please enter a YouTube URL.');
      return;
    }

    try {
      setLoading(true);
      setVideoUrl(''); 
      const response = await axios.post(
        'https://sentiment-cyan.vercel.app/analyze',
        {url: videoUrl},
      );

      
      const dataForPieChart = [
        {name: 'Positive Comments', value: response.data.positive_comments},
        {name: 'Negative Comments', value: response.data.negative_comments},
      ];

      setPieChartData(dataForPieChart);
      setCommentData(response.data);
    } catch (error) {
      console.error('Error sending URL to backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <ScrollView>
        <View className="bg-gray-300 flex-row justify-between p-5">
          <View className="flex-row justify-center items-center gap-1">
            <Text className="text-red-700 text-lg font-sans">
              Talk <Text className="text-blue-700 text-2xl">Sense</Text>
            </Text>
            <Image
              width={33}
              height={33}
              source={{uri: 'https://img.icons8.com/color/96/youtube-play.png'}}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => Toast.success("Will work in Future")}>
              <Text className="text-lg font-semibold text-gray-600">
                Pricing
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-10">

          {/* Search bar */}
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View
                style={styles.circleContainer}
                className="border border-gray-400 rounded-full">
                <View style={styles.formContainer}>
                  <TextInput
                    value={videoUrl}
                    onChangeText={e => setVideoUrl(e)}
                    placeholder="Youtube link here..."
                    placeholderTextColor="gray"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <View style={styles.buttonInner}>
                      <Text style={styles.buttonText}>Search</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.glows}>
                  <View style={[styles.glow, styles.glow1]} />
                  <View style={[styles.glow, styles.glow2]} />
                  <View style={[styles.glow, styles.glow3]} />
                  <View style={[styles.glow, styles.glow4]} />
                </View>
              </View>
            </View>
          </View>

          
          {loading ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="x-large" color="#FF6347" />
            </View>
          ) : (
            commentData && (
              <View style={{flex: 1, paddingTop: 30}} className="mt-5">
                <View
                  style={{
                    maxWidth: 300,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    shadowOffset: {width: 0, height: 2},
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      padding: 12,
                    }}>
                    <View style={{alignItems: 'center', marginBottom: 8}}>
                      <Image
                        source={{uri: commentData.profile_picture_url}}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 50,
                          borderWidth: 4,
                          borderColor: '#fff',
                        }}
                      />
                      <View style={{paddingTop: 8}}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#333',
                          }}>
                          {commentData.channel}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 4,
                          }}
                          className="flex justify-center items-center gap-2">
                          <Image
                            className="text-black"
                            style={{width: 20, height: 20}}
                            source={{
                              uri: 'https://img.icons8.com/dusk/64/facebook-like.png',
                            }}
                          />
                          <Text className="font-medium" style={{color: '#777'}}>
                            {commentData.total_likes}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      className="mt-3"
                      style={{flexDirection: 'col', marginHorizontal: 5}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 15,
                          marginHorizontal: 4,
                        }}
                        className="w-full mb-3 border">
                        <Text
                          className="text-black"
                          style={{fontWeight: 'bold'}}>
                          <Text className="font-medium">Total Comments:</Text>{' '}
                          {commentData.total_comments}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 15,
                          marginHorizontal: 4,
                        }}
                        className="w-full mb-3 border">
                        <Text
                          className="text-black"
                          style={{fontWeight: 'bold'}}>
                          <Text className="font-medium text-green-800">
                            Positive Comments:
                          </Text>{' '}
                          <Text className="text-green-800 font-bold">
                            {commentData.positive_comments}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 15,
                          marginHorizontal: 4,
                        }}
                        className="w-full mb-3 border">
                        <Text
                          className="font-medium text-red-800"
                          style={{fontWeight: 'bold'}}>
                          <Text className="font-medium">
                            Negative Comments:
                          </Text>{' '}
                          <Text className="font-bold text-red-800">
                            {commentData.negative_comments}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    paddingLeft: 48,
    paddingRight: 48,
    width: '140%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  circleContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
  },
  formContainer: {
    flexDirection: 'row',
    borderRadius: 999,
    zIndex: 50,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#4b5563',
  },
  button: {
    backgroundColor: '#0652DD',
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 999,
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 2,
    marginRight: 2,
  },
  buttonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  glows: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    borderRadius: 999,
    opacity: 0.6,
  },
  activityIndicatorContainer: {
    marginTop: 120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
