//Define common styles for project-wide usage
import { StyleSheet } from 'react-native';


 export const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  paddingTop: 16,
	  paddingHorizontal: 5,
	},
	input: {
	  height: 40,
	  borderColor: 'gray',
	  borderWidth: 1,
	  marginBottom: 3,
	  paddingHorizontal: 10,
	},
	inputContainer: {
	  marginHorizontal: 4,
	},
	filterContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  marginBottom: 3,
	},
	filterContent: {
	  flexDirection: 'row',
	  alignItems: 'center',
	},
	filterLabel: {
	  marginRight: 7,
	  paddingHorizontal: 10,
	  fontSize: 16,
	},
	filterText: {
	  marginRight: 5,
	  fontSize: 16,
	},
	buttonContainer: {
	  paddingHorizontal: 30,
	},
	card: {
	  flex: 1,
	  alignItems: 'center',
	  marginBottom: 10,
	  marginHorizontal: 5,
	  backgroundColor: '#fff',
	  padding: 10,
	  borderRadius: 8,
	  elevation: 2,
	},
	image: {
	  width: 150,
	  height: 210,
	},
	row: {
	  justifyContent: 'space-between',
	},
	modal: {
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	filterModalContainer: {
	  backgroundColor: 'white',
	  padding: 20,
	  borderRadius: 10,
	  width: '80%',
	},
	filterModalTitle: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  marginBottom: 10,
	},
	flatListContainer: {
		height: 260, // Set a specific height for the FlatList container
	  },
	homeContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 20, // Adjust the padding as needed
	  },
	  title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		alignSelf: 'center',
	  },
	  flatListContent: {
		paddingVertical: 10, // Adjust the padding as needed
	  },
	  rouletteCard: {
		flex: 1,
		alignItems: 'center',
		marginHorizontal: 5,
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 8,
		elevation: 2,
		marginVertical: 5, // Add vertical margin
	  },
	  collectionCardImage: {
		width: '100%',
		height: 200, // Adjust height as needed
		resizeMode: 'contain',
	  },
	  //Card Modal
	  cardModalContainer: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
	  },
	  cardImage: {
		width: 200,
		height: 280,
		marginBottom: 10,
	  },
	  logoImage: {
		  width: 50,
		height: 50,
	  },
	  types: {
		flexDirection: 'row',
		alignItems: 'center',
	  },
	  typeImage: {
		width: 20,
		height: 20,
	  },
	  //Buttons
	  buttonText: {
		fontSize: 14,
		fontWeight: '500',
		textTransform: 'uppercase',
		color: 'white',
	  },
	  closeButton: {
		// width: '40%',
		paddingHorizontal: '7%',
		paddingVertical: '3%',
		marginTop: '2%',
		elevation: 3,
		borderRadius: 10,
		alignSelf: 'center',
		alignItems: 'center',
        flexDirection: 'row', 
		justifyContent: 'center', 
		backgroundColor: '#0d94e8',
	  },
	  addButton: {
		paddingHorizontal: '7%',
		paddingVertical: '3%',
		marginVertical: '1%',
		elevation: 3,
		borderRadius: 10,
		alignSelf: 'center',
		alignItems: 'center',
        flexDirection: 'row', 
		justifyContent: 'center', 
		backgroundColor: '#009E60',
	  },
	  removeButton: {
		paddingHorizontal: '7%',
		paddingVertical: '3%',
		marginVertical: '1%',
		elevation: 3,
		borderRadius: 10,
		alignSelf: 'center',
		alignItems: 'center',
        flexDirection: 'row', 
		justifyContent: 'center', 
		backgroundColor: 'red',
	  },
  });