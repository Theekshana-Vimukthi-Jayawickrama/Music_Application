import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:music_app/models/Song.dart';
import 'package:music_app/models/song_provider.dart';
import 'package:provider/provider.dart';

class Songpage extends StatefulWidget {
  final String data;
  const Songpage({super.key, required this.data});

  @override
  State<Songpage> createState() => _SongpageState();
}

class _SongpageState extends State<Songpage> {
  @override
  void initState() {
    super.initState();
    getData();
  }

  String lyrics = '';
  String codeData = '';
  String notation = '';
  String name = '';
  String codeCredit = '';
  String noteCredit = '';

  Future<void> getData() async {
    final songDataProvider = Provider.of<SongProvider>(context, listen: false);
    List<Song> songs = songDataProvider.songs;
    for (Song song in songs) {
      if (song.id == widget.data) {
        lyrics = song.lyricsData;
        codeData = song.songCodeData;
        notation = song.songNotationData;
        name = song.name;
        codeCredit = song.codeCredit;
        noteCredit = song.notationCredit;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: DefaultTabController(
        length: 3,
        child: SafeArea(
          child: Scaffold(
            backgroundColor: Colors.black,
            appBar: AppBar(
              leading: IconButton(
                icon: Icon(Icons.arrow_back, color: Colors.white),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              backgroundColor: Colors.black,
              bottom: const TabBar(
                tabs: [
                  Tab(
                    icon: Icon(
                      Icons.lyrics_outlined,
                      color: Colors.white,
                    ),
                    text: 'Lyrics',
                  ),
                  Tab(
                    icon: Icon(Icons.piano, color: Colors.white),
                    text: 'Codes',
                  ),
                  Tab(
                    icon: Icon(Icons.note_alt_outlined, color: Colors.white),
                    text: 'Eastern Notes',
                  ),
                ],
                indicatorColor: Colors.white,
                unselectedLabelColor: Colors.grey,
                labelColor: Colors.white,
              ),
              title: Text(
                name,
                style: TextStyle(color: Colors.white),
              ),
            ),
            body: TabBarView(
              children: [
                SingleChildScrollView(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(25.0),
                        child: SizedBox(
                          height: MediaQuery.of(context).size.height,
                          width: double.infinity,
                          child: Image.memory(
                            base64.decode(lyrics),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SingleChildScrollView(
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        height: 20,
                        decoration: const BoxDecoration(color: Colors.amber),
                        child:
                            Text("Credit to $codeCredit for the inspiration."),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(25.0),
                        child: SizedBox(
                          height: MediaQuery.of(context).size.height,
                          width: double.infinity,
                          child: Image.memory(
                            base64.decode(codeData),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SingleChildScrollView(
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        height: 20,
                        decoration: const BoxDecoration(color: Colors.amber),
                        child:
                            Text("Credit to $noteCredit for the inspiration."),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(25.0),
                        child: SizedBox(
                          height: MediaQuery.of(context).size.height,
                          width: double.infinity,
                          child: Image.memory(
                            base64.decode(notation),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
