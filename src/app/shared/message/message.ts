export class Message {

  // 로그인 출력 메세지
  public wrongEmail = '이메일이 다르거나, 형식이 잘못되었습니다.';
  public wrongPassword = '비밀번호가 잘못되었습니다.';

  // 네트워크 오류 메세지
  public networkError = '네트워크 확인 후 이용하여주세요.';

  // 회원가입 출력 메세지
  public alreadyEmail = '등록된 이메일입니다.';

  // loading
  public loading = '페이지를 준비중입니다.';
  
  // 로그아웃 출력 메세지 
  public failedLogout = '로그아웃에 실패하였어요!';

  // 로그인 필요시 출력 메세지
  public requiredLogin = '로그인후 이용하여주세요.';
  
  // URL 진입시 인증 및 권한 여부 출력 메세지
  public accessLoading = '접근 권한을 확인중입니다.';
  public failedAccess = '접근 권한이 없습니다.';

  // 이메일 유효성 검증 출력 메세지
  public requiredEmail = '이메일을 입력하여주세요.';
  public validatorEmail = '이메일 형식이 올바르지 않습니다.';

  // 비밀번호 유효성 검증 출력 메세지
  public requiredPassword = '비밀번호를 입력하여주세요.';
  public validatorPassword = '비밀번호는 최소 8자리 이상입니다.';

  // 비밀번호 변경시 출력 메세지
  public validatorConfirmPassword = '비밀번호가 동일하지 않습니다.';
  public validatorChangePassword = '비밀번호가 유효하지 않습니다.';
  public successChangePassword = '비밀번호 변경이 성공하였습니다.';
  public failedChangePassword = '비밀번호 변경이 실패하였습니다.';

  // 인증 메일 요청시 출력 메세지
  public successSendEmail = '인증 메일을 확인하여 주세요!';
  public failedSendEmail = '인증 메일을 보내지 못하였습니다.';

  // 회원정보 출력 메세지
  public emailVerified = '이메일 인증이 완료되었습니다.';
  public emailVerifiedNot = '이메일 인증이 완료되지 않았습니다.';
  public notPhoto = '프로필 사진을 등록하여 주세요.';

  // 회원정보 업데이트시 출력 메세지
  public successUpdateInfo = '회원 정보를 업데이트 하였습니다.';
  public failedUpdateInfo = '회원 정보 업데이트를 실패하였습니다.';
  public failedUpdateFile = '회원 프로필 사진 업데이트를 실패하였습니다.';

  // 회원 가입시 출력 메세지
  public successSignup = '환영합니다! 인증메일을 확인하여 주세요!';
  public failedSignup = '가입에 실패하였습니다.';

  // 회원 삭제시 출력 메시지
  public failedDeletePhoto = '프로필 사진 삭제를 실패하였습니다';
  
  // 회원 탈퇴시 출력 메세지
  public successDeleteUser = '회원 탈퇴를 완료하였습니다..!';
  public failedDeleteUser = '회원 탈퇴에 실패하였습니다.';

  // 폼 유효성 출력 메세지
  public requiredMessage = '필수 입력입니다.';
  public validatorForm = '유효하지 않은 값이 있습니다.';
  public validatorUrl = 'URL 형식이 잘못되었습니다.';
  public validatorFile = '파일 크기 혹은 형식이 잘못되었습니다.';
  public validatorFileLength = '파일 업로드 개수가 초과하였습니다.';

  // 프로젝트 생성시 출력 메세지
  public failedCreateProject = '프로젝트 생성에 실패하였습니다.';

  // 프로젝트 제거시 출력 메세지
  public notEqualTitle = '제목이 동일하지 않습니다.';
  public failedDeleteProjectPhoto = '파일 삭제를 실패하였습니다.';
  public successDeleteProject = '프로젝트를 삭제하였습니다.';
  public failedDeleteProject = '프로젝트 삭제를 실패하였습니다.';

  // 프로젝트 좋아요 클릭 출력 메세지
  public alreadyClickLike = '이미 좋아요를 눌러주셨어요!';
  public successClickLike = '좋아요를 눌러주셔서 감사합니다';
  public failedClickLike = '잠시 후에 다시 눌러주세요!';

  // 회원 레벨 변경시 출력 메세지
  public successChangeLevel = '회원 권한이 변경되었습니다.';
  public failedChangeLevel = '권한 변경이 실패하였습니다.';
  public failedChangeLevelHigh = '자신보다 높은 권한을 설정할 수 없습니다.';

  // message & email send 메세지
  public successSendMessage = '메세지를 성공적으로 보냈습니다.';
  public failedSendMessage = '메세지를 보낼 수 없습니다.';

  // 기본 회원 이미지 설정시 출력 메세지
  public successUploadDefaultImage = '기본 이미지를 등록하였습니다.';
  public failedUploadDefaultImage = '기본 이미지 등록에 실패하였습니다.';

  // 이메일 미인증시 출력 메세지
  public notEmailVerified = '이메일 인증이 필요합니다.';

}
