import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Flex from '@components/Flex';
import { Colors } from '@assets';
import useHeader from '@hooks/useHeader';
import { Button } from '@components';
import { Crypto } from '@utils';
import RegisterDeviceHelper from './helper/RegisterDeviceHelper';
import { useCreateDeviceMutation } from '@graphql/generated/graphql';

const RegisterDevice = ({ navigation, route }) => {
	const { wifiName, password } = route?.params || {};
	const [log, setLog] = useState('log here');
	const ip = useRef();
	useHeader(navigation);
	const [createDevice, { loading }] = useCreateDeviceMutation();
	useEffect(() => {
		startBroadcast();
	}, []);

	const handleCreateDeviceCompleted = data => {
		if (data?.createDevice) {
			const { keyAndCerts, id } = data?.createDevice || {};
			// const decryptedData = Crypto.decryptAES(
			// 	'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',
			// 	'demetersecr3t'
			// );
			const decryptedData = JSON.parse(Crypto.decryptAES(keyAndCerts, 'demetersecr3t'));
			console.log('ID', id);
			console.log(decryptedData?.certificatePem);
			console.log(decryptedData?.keyPair?.PrivateKey);
			// getInfo();
			RegisterDeviceHelper.setParams(ip.current, {
				// deviceId: '6246d8e04aefadfd291ea045',
				deviceId: id,
			})
				.then(() =>
					RegisterDeviceHelper.setParams(ip.current, {
						params: {
							mqtt: {
								endpoint: 'ash0p3o5d1jwl-ats.iot.ap-southeast-1.amazonaws.com',
							},
						},
					})
				)
				.then(() =>
					RegisterDeviceHelper.setParams(ip.current, {
						params: {
							mqtt: {
								ca: '-----BEGIN CERTIFICATE-----\r\nMIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\r\nADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6\r\nb24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL\r\nMAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv\r\nb3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj\r\nca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM\r\n9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw\r\nIFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6\r\nVOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L\r\n93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm\r\njgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC\r\nAYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA\r\nA4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI\r\nU5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs\r\nN+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv\r\no/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU\r\n5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy\r\nrqXRfboQnoZsG4q5WTP468SQvvG5\r\n-----END CERTIFICATE-----',
							},
						},
					})
				)
				.then(() =>
					RegisterDeviceHelper.setParams(ip.current, {
						params: {
							mqtt: {
								crt: decryptedData?.certificatePem,
								// crt: '-----BEGIN CERTIFICATE-----\nMIIDWTCCAkGgAwIBAgIUbxkqY9omEnT0KmWzapRWnRqauy0wDQYJKoZIhvcNAQEL\nBQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g\nSW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTIyMDQwMTEwNDgw\nOFoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0\nZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAPDclXnpOEGVJBQeDlK6\nRXkL7iDhXpby0h2fbJKOB28VBnHUMrjqWuNe7ZR6DHjZyx0swi6Zt8RhOWixAwwv\nah4cZ7IVQpLJWAHg0xHOSKWXeOInnOUOiuBt4hAptEB+qAfhXMRZY3KMj5FEn0VA\nX8LNLMUfb6E6FfIs8jC3B5ABu/J8eHfpClZ3pAJMM8QcUKXllq6E919rnxZJM3O+\no3GAl3ED0XZtXhVfg2YJ86Inw2niO4tWu1VuhS0IfXA+kC43s8nKWZs66svLxkjb\nkTMu5G2luVR+Y2B1FAzSz+A7n93/VyzvtNohzVMETUCHce6R+34SrQS95wJBrOmI\nNLsCAwEAAaNgMF4wHwYDVR0jBBgwFoAUyn0QHyn1wDUHTyr6REBOq4eMq4cwHQYD\nVR0OBBYEFEEzZZfh4Fmchl512Z8sk9Yb5qNbMAwGA1UdEwEB/wQCMAAwDgYDVR0P\nAQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQDal/QOSKWWhGI5XKjN21kT88aa\nprh07tQSI1tC5q+5yOycfB0cMD/bGeekEyxwU3gcxqKWUsReu6UtptTOfpBnqiO+\nxHaDAVs+PLQWuYQYScJNNnjWMMrg468g2cXHfvL0OFodiFFWWarmkzYK4XYL91at\n45EZMPJgY9YHsw+98WNrfKaLD8ciR/bffqkmYFLeFNRLMNya0yWmqvNj2OLnLxtQ\nxhv23VR6D2Qz1b8PGqLV3DvyAzYI33ophQWlzrs6qxwELVqgjBc9xGiTckTIXKMg\nEL0yamFXDZAmI6t4ytW3SExKBdT54CEx4c6qWb3fWwqspD2ZT+xJy1wVL7oJ\n-----END CERTIFICATE-----\n',
								// crt: '-----BEGIN CERTIFICATE-----\nMIIDWTCCAkGgAwIBAgIUIq2qEBBhWe1688yOBq93wI69COUwDQYJKoZIhvcNAQEL\nBQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g\nSW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTIyMDMyNTA2Mzk1\nMVoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0\nZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOU1umZ4ffwwCSjRm+MO\nnkAGrPKM3k4AP99rCgDW1AIDSznPNYlmBCB2tKP6mdZTtrFKWwHrpagDcAzedJrS\nPELMScZHOFXc0Atm7vVcD4KxGqdHEK5v3AR+MM/mZMczdNZ7TH+hpeRpqVkqkeGj\nUEHn1onUcH/QiCvOnyJYwMuoWFsoYMmPuXSCOYsQ0uEAiJ51gSCsIeuMpxKNu/Id\nWlaZlLqNf9K1g+LDjDN4TNH7N4BaAHPTUgjyXwiCIne8MxmOpssvvwgV9Z+lDdFl\nr8qh78UQbWLNMhZXAjqDLAIdVCQzJdgQQur+7CwzxTkihONbNvtqKqyuujPeLRZU\nm/sCAwEAAaNgMF4wHwYDVR0jBBgwFoAUb4lq2FG+KHb+WJzVYxWlCaBoLiIwHQYD\nVR0OBBYEFK6omm3NTkGmKgg4LJUm4HofNU9OMAwGA1UdEwEB/wQCMAAwDgYDVR0P\nAQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQC3USQ495PoUFpSmyj2w2Ixb4SW\nwHh9oq5b6lRg4ne1uc8L/RP/Lw0jVj3h+0CUTPVTlpykldcwZQLXKmSmDSZiCw92\nVdS1icDd3z4ZgxpJRRdg1PJQG+p0jgvxDaQ+VBPA+XeCFlYWhlm3oMqY9LXmIrWF\nVgddKMMdwo9UklNiy1L6/GjMGhjDpcKYDif4uJRDxD65MRysHYDXUoVvi/Zb8r8f\nvvJ2LgEmR1jdcFSZT/Ug5uPqc85H3mhfrFn8a0UYq2feJWADpddVJLmNWOTxRFII\nUJ/+79CxlJfqNvAm3vSQ8tY4xUSnWOvr08B5ROB83HEySrxmNQ2wbIvO9Dr6\n-----END CERTIFICATE-----\n',
							},
						},
					})
				)
				.then(() =>
					RegisterDeviceHelper.setParams(ip.current, {
						params: {
							mqtt: {
								private: decryptedData?.keyPair?.PrivateKey,
								// private:
								// 	'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA8NyVeek4QZUkFB4OUrpFeQvuIOFelvLSHZ9sko4HbxUGcdQy\nuOpa417tlHoMeNnLHSzCLpm3xGE5aLEDDC9qHhxnshVCkslYAeDTEc5IpZd44iec\n5Q6K4G3iECm0QH6oB+FcxFljcoyPkUSfRUBfws0sxR9voToV8izyMLcHkAG78nx4\nd+kKVnekAkwzxBxQpeWWroT3X2ufFkkzc76jcYCXcQPRdm1eFV+DZgnzoifDaeI7\ni1a7VW6FLQh9cD6QLjezycpZmzrqy8vGSNuRMy7kbaW5VH5jYHUUDNLP4Duf3f9X\nLO+02iHNUwRNQIdx7pH7fhKtBL3nAkGs6Yg0uwIDAQABAoIBAHWlmNFaTCMkgOHe\nqGpaF5L/c8nVqwkaA+16MGMJQrJMV8CDwF64AbrrZCpQzwS8hMx0T0jJxowCXTM4\nut9ZzYB1qWS/o6vk8rrAIPiihLN1YBM+/BCZ4NWsdm4koKmb8+Edf91cOAn8hCeV\nmCIQRnX1F7gVGcZrg8qtj4Kh8+yvKXl00j7qtb+M3Ol6hz/m0s8BvfTJOZG1cXC1\n3S9TDxTA+VP1zsckogslVU+2j+zGFKXYymOnb9RTl5MXnVSw4ZzI/4ODeS4UrJI4\nDYNv5NZUS78r8mSleu/hHo7aYg3D9jscgaRYRwxKwEDFX1Nxop2FCd3EnOF0rLY8\nv9cJK9ECgYEA/9YdQsfDnUmhOZuulWBMqRpcJylIxtEGPo9d+A3B3pdKLb/INsOZ\n+WegvFeF4UR8NHh53lOW5lSXgnB0rtP73qa47aCu15myAJPlsr4Nkv09Vjy8Q1/s\ni9Z9K4IMgfQjSFn151vQ3EZlf/R0IlmPOXRKFf23wudmq/4CzhJrz1MCgYEA8QQE\nllZB6ChiGZPwytPBjsFEF32Qdjyfv2/qlcgkyLFMVSn1T4AzKrdlF72XvWiN6szM\n/dztC20s3rYncOFStaR9BTDZUSmP7mjmoVqBiX8+zN6ppWwbCcJAqfKktWvmJrEk\nubJZA85Ax8NdDm74nrila9c7wpFSB+5MJTGdn/kCgYA0oy0qDEfnGLsfSzTEbyfW\nsyG6vPfIUEFkpcLDwrDcx2vvtcHP4rbPZc7gcXGOQ7T6Zr9MSw6FHWp+3/xh7COq\nT8tEuQbAPVMuYz+jYw8P6yKvl5d0lUvqCZt/VCaWplCMFlZN38o9SA6iIP20A5FA\nVPjZRXaFl268fGq/U3LzGQKBgQDws/6Q1lzEK3Ct8t5M8ucgV0xV2YVpUGqKmo9C\nP7zc4pVFiL4CRBrV0osYBrWA6OazVQ51iysCemqRkoIZbi9YUYq6oGqpcETa6dFL\n3EP6uiZSHR54o1rtiB9km3x74+LbSZdQDhpwfpCb8TUCsTmD6wzqgu6gBtpSKV/K\n1Z6CoQKBgQDUYbnj5pi3brphfdPJA4DnydJUjguyCsXxl+hdlJzBOQxd0Sy2SBMl\nV9yScnvXJTcPOkBvV8hDSAWuftJtg4FxMqQzhhIOllfrodox7xj3LjMPNeet+chc\nC5/Est4Sr8NncO+sFJCxlFSHIEWerSd7GfsOmUPprR7Wm3sB7TDuig==\n-----END RSA PRIVATE KEY-----\n',
								// private:
								// 	'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA5TW6Znh9/DAJKNGb4w6eQAas8ozeTgA/32sKANbUAgNLOc81\niWYEIHa0o/qZ1lO2sUpbAeulqANwDN50mtI8QsxJxkc4VdzQC2bu9VwPgrEap0cQ\nrm/cBH4wz+ZkxzN01ntMf6Gl5GmpWSqR4aNQQefWidRwf9CIK86fIljAy6hYWyhg\nyY+5dII5ixDS4QCInnWBIKwh64ynEo278h1aVpmUuo1/0rWD4sOMM3hM0fs3gFoA\nc9NSCPJfCIIid7wzGY6myy+/CBX1n6UN0WWvyqHvxRBtYs0yFlcCOoMsAh1UJDMl\n2BBC6v7sLDPFOSKE41s2+2oqrK66M94tFlSb+wIDAQABAoIBAEsUNVF5aHMh3O40\n8qYGVMnOJfpxMCRGqqVpL2ak998M6ygtenDeLL3hhDwuSxPMagxaucLASIvnTF26\nxGEuOjT7K7M6AvcFFFSXy/AszpvVnVBr08f/tgb2utBuvFYPwda7now0C93syl79\ntbk+QHzGDx0orA0B5ojK7o9WmRhcFmkO7hHAeXuZ7PVG2Q76K3M3zmlxJj4fYtI6\nFQ4zDFFl8lTYYs/LKcTFGTB6Pf0PY0KLwke8DDrja+xbqWGyMc9fcsJYP1KvdLn8\nrFYyNRIDCH391V5b9cabNuUXELb3joAxte+5fHSzvoJuoLKcl+x2pjAsNPVVqxAA\nf0/u+ukCgYEA/qAR592r6dmG5glOvY3xxtbSSzYGTcZNiLTA7mbHpmq25ROUZ6Nh\nVCriG3/4Ebzhx0GMA98VdHRoD6Z7Ribr2hsN3awtlXdP6xByZNfhlvuFE/Ao0J01\nUiR95yHBfQ/TdB9kt3+Xzgqa/Cicp24UsGdagxFUYc/MUJD0Vp72Fx8CgYEA5nKH\nwtB0i5g43au2rcFmSI4C84BySpiXoPPts45EZJ/6WWAUolAx+l2JSf8scC6db4G6\npVqHy/ekvR858I9/iTB6lTmKyEemgYI+BV+Q6dUudFT0WzFDQFqWglSJ2f8OrCKF\nistLRP6I/KQLFpNV7INdoPSQDY7TdB9lDtT6q6UCgYAzRO/WDCBtectbzkv4hvhD\n3UWCt2IVjvRVrm+akT9qFtq0zXh4VcFnPStB9kZw6+NaR6x1qxma1UWOwSrZOUUM\nKZ5lICIdkmSZJDqka4OU7xggp57QQpdV7tsbCwT2tZUSMLAK8roSVrhWRaclX1jz\nHBxxf6/J8hllr4pDVsaeaQKBgQDJgThJFzHxpoeC/dVdFhG0O8lE1voZVFix+tnM\n+ge/3Utxv1wLmgg5nnSf6asX5QrxKATm9cRsi/zXCmkFetTQRz3JImnCOzTTZemJ\nlUkHzssyGd8Zpnfh29Rj3jw0DJzt07nl5WHJ0LBECcVQVkD58Nx8E52q3Ur07UbW\ns1EFqQKBgQCYPELKpJ5KhRicNU+isgsIyIbsC/GJQfhr2MGntZZW21M8GKhaJS8O\nyX/cRZirXx0VaCHr3rRY++I1fZElXZDyal1HN87i0jlsDX/bcurRGjqgmOJVMX0Q\nkXf/wfkLe+iz4pI0LuDo6BIRu9+geTt08a5kR5akJWHLrmaQGWYFbg==\n-----END RSA PRIVATE KEY-----\n',
							},
						},
					})
				)
				.then(() => RegisterDeviceHelper.connectMQTT(ip.current))
				.then(() => handleCheckConnect(id));
		}
	};

	const handleCheckConnect = id => {
		setTimeout(() => {
			RegisterDeviceHelper.getDeviceInfo(ip.current).then(response => {
				if (response?.data?.connection?.mqtt_server?.status === 'connected') {
					navigation.navigate('SetUpDevice', {
						deviceId: id,
					});
				}
			});
		}, 3000);
	};

	const getInfo = () => {
		RegisterDeviceHelper.getDeviceInfo(ip.current).then(data => console.log(data));
	};

	const startBroadcast = () => {
		RegisterDeviceHelper.startSmartConfig({ wifiName, password })
			.then(data => {
				const { ip: ipv4 } = data || {};
				ip.current = ipv4;
				createDevice({
					variables: {
						input: {
							deviceProfileId: '6246a66375f6e0257fe2cde7',
							deviceSerial: 'DMT_ESOC_1576480',
						},
					},
					onCompleted: handleCreateDeviceCompleted,
				});
			})
			.catch(err => console.log(err));
	};

	return (
		<Flex style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Bring device closer to router</Text>
				<View style={styles.loadingBlock}>
					<ActivityIndicator color={Colors.green} />
					<View style={styles.infoBlock}>
						<Text style={styles.infoText}>{log}</Text>
						<Text style={styles.infoText}>Device connected</Text>
						<Text style={styles.infoText}>Message sent to device</Text>
						<Text style={styles.infoText}>Connecting device to network</Text>
					</View>
				</View>
			</View>
			<Button title='Finalize' />
		</Flex>
	);
};

export default RegisterDevice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		padding: 20,
		paddingBottom: 48,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 21,
		color: Colors.green,
		textAlign: 'center',
	},
	loadingBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 24,
	},
	infoText: {
		fontSize: 15,
		color: Colors.black,
	},
	infoBlock: {
		marginLeft: 16,
	},
});
