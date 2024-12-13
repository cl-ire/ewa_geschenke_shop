# ewa_geschenke_shop


# setup Database 

Install MariaDB:
sudo apt install mariadb-server

Start the MariaDB service:
sudo systemctl start mariadb


populate database 
chmod +x setup/init_tables.sh
./setup/init_tables.sh


create hash passwords
node hashPassword.js "myPlaintextPassword"



# setup vue 

Start vue 
npm run dev






