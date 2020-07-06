require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const utils = require("discord.js-utils");

//prefix = '!'
const { prefix, second } = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	
	switch(cmd) {
	case 'ping':
		msg.channel.send('Pong');
		utils.random.dog().then(console.log); 
		break;
	case 'beep':
		msg.channel.send('Boop');
		break;
	case 'server':		 
		msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
		break;
	case 'user': 
		msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
		break;
	case 'avatar':
		if (!msg.mentions.users.size) {
			return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
			});
		msg.channel.send(avatarList);
		
		break;		
	case 'doggo':
		utils.random.dog().then(console.log); 	 
		const doggoEmbed = new Discord.MessageEmbed()
								.setTitle('Here\'s your doggo')
								.setImage('https://random.dog/cdfe24b3-8ba8-44b1-a5f4-4174936dabb6.jpg');

		msg.channel.send(doggoEmbed);
		break;
	case 'role':
		
		if(args){
			let role_name = `r_${args[0]}`
			msg.channel.send(role_name);
			// does never find role..
			let role = msg.member.guild.roles.fetch(role_name);
			if( !role )
			{
				msg.channel.send(`that role does not exist`);
				msg.guild.roles.create({ data: { name: role_name,
												color: args[0]} })
												.then(role => msg.member.roles.add(role))
												.catch(console.error);
			}
			else{
				msg.channel.send(`that role exists`);
				msg.channel.send(`found: ${role_name}`);
			}
			//message.member.addRole(role);
			msg.channel.send(`you want: ${role_name}`);
			//
			
		}
		
		break;
	default:
		msg.channel.send(`I don't understand ...  "${cmd}"`);
	}
})

client.login(process.env.TOKEN)
