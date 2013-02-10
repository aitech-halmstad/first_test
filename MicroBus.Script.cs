//--------------------------------------------------------------
// Press F1 to get help about using script.
// To access an object that is not located in the current class, start the call with Globals.
// When using events and timers be cautious not to generate memoryleaks,
// please see the help for more information.
//---------------------------------------------------------------

namespace Neo.ApplicationFramework.Generated
{
    using System.Windows.Forms;
    using System;
    using System.Drawing;
	using System.Net.Sockets;
	using System.Threading;
	using System.Globalization;
	using System.Text.RegularExpressions;
	using System.Text;
	using System.Linq;
    using Neo.ApplicationFramework.Tools;
    using Neo.ApplicationFramework.Common.Graphics.Logic;
    using Neo.ApplicationFramework.Controls;
    using Neo.ApplicationFramework.Interfaces;
    
    
    public partial class MicroBus
    {
		public static NetworkStream myStream;
		public static TcpClient myClient;
		public static byte[] myBuffer;
		public static bool bActive = true;
		public Thread tidSendRand = new Thread(new ThreadStart(SendRandThread));
		public bool initialized = false;
		
		public static byte[] StringToByteArray(String hex)
		{
			int NumberChars = hex.Length;
			byte[] bytes = new byte[NumberChars / 2];
			for (int i = 0; i < NumberChars; i += 2)
				bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
			return bytes;
		}
		
		public void SendMessage()
		{
			String r1 = Globals.Tags.Microbus_String_1.Value.ToString();
			String r2 = Globals.Tags.Microbus_String_2.Value.ToString();

			String myString = tcpframe(r1, r2);
			byte[] byteArray = StringToByteArray(myString);
			myStream.Write(byteArray, 0, byteArray.Length);
			System.Threading.Thread.Sleep(500);

		}
		
		public static void SendRandThread()
		{
			Random rnd = new Random();
			while (bActive)
			{
				Console.Write("> ");
               
				int rnd1 = rnd.Next(1, 298);
				int rnd2 = rnd.Next(1, 500);

				string r1 = "Speed";
				if (rnd1 < 10 && rnd1 > 1)
					r1 += "     " + rnd1;
				if (rnd1 < 100 && rnd1 > 10)
					r1 += "    " + rnd1;
				if (rnd1 > 100)
					r1 += "   " + rnd1;

				string r2 = "Total";
				if (rnd2 < 10 && rnd2 > 2)
					r2 += "      " + rnd2;
				if (rnd2 < 100 && rnd2 > 10)
					r2 += "     " + rnd2;
				if (rnd2 > 100)
					r2 += "    " + rnd2;

				// String myString = tcpframe(Console.ReadLine());
				String myString = tcpframe(r1, r2);
				byte[] byteArray = StringToByteArray(myString);
				try
				{
					myStream.Write(byteArray, 0, byteArray.Length);
				}
				catch (Exception e)
				{
					MessageBox.Show("Error: " + e);
					bActive = false;
				}
				System.Threading.Thread.Sleep(500);
			}
		}

		public static string tcpframe(String row1, String row2)
		{
			string TCPval = "";
			string hexString = "000000000001464630300241304132323746323030383031303132303230303130313030303030303030ffff31310f53104a";
			row1 = string.Join(string.Empty, row1.Select(c => ((int)c).ToString("X")).ToArray());
			row2 = string.Join(string.Empty, row2.Select(c => ((int)c).ToString("X")).ToArray());
			string ledText = row1 + "0D" + row2;
			string ETX = "03";
			string checksum = "3030";
			string EOT = "04";

			TCPval += hexString;
			TCPval += ledText;
			TCPval += ETX;

			int NumberChars = TCPval.Length;
			byte[] bytes = new byte[NumberChars / 2];
			for (int i = 0; i < NumberChars; i += 2)
				bytes[i / 2] = Convert.ToByte(TCPval.Substring(i, 2), 16);

			int hashValue = 0;
			for (int index = 0; index < bytes.Length; index++)
			{
				hashValue = hashValue ^ bytes[index].GetHashCode();
			}

			// Create checksum
			checksum += string.Join(string.Empty, hashValue.ToString("X").Select(c => ((int)c).ToString("X")).ToArray());
			TCPval += checksum;
			TCPval += EOT;
			return TCPval;
		}
		
		void MicroBus_Created(System.Object sender, System.EventArgs e)
		{
			String strServer = "192.168.1.10";
			String strPort = "10001";
			
			try
			{
				myClient = new TcpClient(strServer, Int32.Parse(strPort));
				myStream = myClient.GetStream();
				myBuffer = new byte[myClient.ReceiveBufferSize];
			}
			catch (Exception ex)
			{
				MessageBox.Show("Fail" + ex);
			}
		}
    }
}
