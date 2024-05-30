import 'dart:convert';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:music_app/SongPage.dart';
import 'package:music_app/models/Song.dart';
import 'package:music_app/models/song_provider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HeroSection extends StatefulWidget {
  const HeroSection({super.key});

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Hero Section",
      home: SafeArea(
        child: Scaffold(
            backgroundColor: const Color(0xFF1E1E2C),
            appBar: AppBar(
              title: const Text("Enjoy with Music",
                  style: TextStyle(
                    color: Color(0xFFE0E0E0),
                  )),
              backgroundColor: const Color.fromARGB(255, 7, 6, 6),
              actions: [
                IconButton(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.search,
                      color: Color(0xFFE0E0E0),
                    ))
              ],
              elevation: 50.0,
              leading: const Icon(
                Icons.list_sharp,
                color: Color(0xFFE0E0E0),
                size: 35,
              ),
            ),
            body: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                      height: 100,
                      width: double.infinity,
                      decoration: const BoxDecoration(),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          const SizedBox(width: 20.0, height: 100.0),
                          const Text(
                            'Welcome to',
                            style: TextStyle(
                                fontSize: 28.0, color: Colors.white70),
                          ),
                          const SizedBox(width: 20.0, height: 100.0),
                          DefaultTextStyle(
                            style: const TextStyle(
                                fontSize: 32.0,
                                fontFamily: 'Horizon',
                                color: Colors.white),
                            child: AnimatedTextKit(
                              animatedTexts: [
                                RotateAnimatedText('Tune Book'),
                                RotateAnimatedText('Tune Book'),
                                RotateAnimatedText('Tune Book'),
                              ],
                            ),
                          ),
                        ],
                      )),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Padding(
                    padding: const EdgeInsets.all(4.0),
                    child: Container(
                      width: double.infinity,
                      height: 50,
                      decoration: BoxDecoration(color: Color(0xFF252525)),
                      child: const Row(
                        children: [
                          Text(
                            "ALL SONGS",
                            style: TextStyle(color: Colors.white, fontSize: 20),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
                Expanded(child: SecondWidget())
              ],
            )),
      ),
    );
  }
}

class SecondWidget extends StatefulWidget {
  @override
  _SecondWidgetState createState() => _SecondWidgetState();
}

class _SecondWidgetState extends State<SecondWidget> {
  
  Future<List<Song>> fetchItems() async {
    var url = Uri.parse("http://192.168.43.220:8080/api/v1/song/get/all");
    late http.Response response;
    List<Song> songs = [];
    
    try {
       final songDataProvider = Provider.of<SongProvider>(context, listen: false);
      response = await http.get(url);

      if (response.statusCode == 200) {
        // Map data = json.decode(response.body);
        // List<dynamic> songData = data[""];
        List<dynamic> data = jsonDecode(response.body);
        for (var item in data) {
          var name = item['name'];
          var id = item['id'];
          var sinhalaName = item['sinhalaName'];
          var artistPhotoData = item['artistPhoto']['data'];
          var lyricsData = item['lyrics']['data'];
          var songCodeData = item['songCode']['data'];
          var songNotationData = item['songNotation']['data'];
          var codeCredit = item['songCode']['credit'];
          var notationCredit = item['songNotation']['credit'];

          Song song = Song(
            name,
            id,
            sinhalaName,
            artistPhotoData,
            lyricsData,
            songCodeData,
            songNotationData,
            codeCredit,
            notationCredit,
          );
          // songDataProvider.addSong(song);
          songs.add(song);        
        }
        songDataProvider.addSong(songs);
      } else {
        return Future.error("Something gone wrong, ${response.statusCode}");
      }
    } catch (e) {
      print(e);
      return Future.error(e.toString());
    }
    return songs;
  }

  @override
  Widget build(BuildContext context) {
    
    return FutureBuilder(
      future: fetchItems(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
            child: Text('waiting'),
          );
        } else {
          if (snapshot.hasError) {
            return Text(snapshot.error.toString());
          } else {
            return ListView.builder(
                itemCount: snapshot.data?.length,
                itemBuilder: (BuildContext context, int index) {
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      decoration: BoxDecoration(color: Colors.limeAccent),
                      child: ListTile(
                        leading: Image.memory(
                          base64.decode(snapshot.data![index].lyricsData),
                          width: 50,
                          height: 50,
                        ),
                        title: Text(
                          snapshot.data![index].name,
                          style: TextStyle(color: Colors.white),
                        ),
                        subtitle: Text(
                          snapshot.data![index].name,
                          style: TextStyle(color: Colors.white),
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => Songpage(data: snapshot.data![index].id),
                            ),
                          );
                        },
                      ),
                    ),
                  );
                });
          }
        }
      },
    );
  }
}
