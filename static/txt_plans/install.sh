echo "[" > dji_man.json

for i in $(seq 1 34)
do
	echo -n '{' >> dji_man.json;
	echo -n '"page": "'$i'",' >> dji_man.json;

	echo -n '"img": "img-'$i'.jpg",' >> dji_man.json;

	echo -n '"content": "' >> dji_man.json;
	cat dji_text_man_$i.txt | tr -d [:cntrl:] >> dji_man.json;
	echo -n '"},' >> dji_man.json;
done

	echo -n '{' >> dji_man.json;
	echo -n '"page": "35",' >> dji_man.json;

	echo -n '"img": "img-35.jpg",' >> dji_man.json;

	echo -n '"content": "' >> dji_man.json;
	cat dji_text_man_$i.txt | tr -d [:cntrl:] >> dji_man.json;
	echo -n '"}]' >> dji_man.json;
