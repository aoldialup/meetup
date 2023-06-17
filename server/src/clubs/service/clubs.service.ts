import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/typeorm/entities/Address';
import { Club } from 'src/typeorm/entities/Club';
import { Repository } from 'typeorm';
import { CreateClubParams } from 'src/utils/types';
import { State } from 'src/typeorm/entities/State';

enum ClubCategory {
  'RoadRunner',
  'Womens',
  'City',
  'Trail',
  'Endurance',
}

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club) private clubRepository: Repository<Club>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(State) private statesRepository: Repository<State>,
  ) {}

  async findClubs(clubId?: number) {
    if (clubId) {
      const result = await this.clubRepository.find({
        relations: {
          address: true,
        },
        where: {
          id: clubId,
        },
      });

      return result;
    }

    return this.clubRepository.find({
      relations: {
        address: true,
      },
    });
  }

  async deleteClub(id: number) {
    const result = await this.clubRepository.delete({
      id,
    });

    return result;
  }

  async getStates() {
    const result = this.statesRepository.find();
    return result;
  }

  // async ass() {
  //   const obj = [
  //     { short: 'AL', name: 'Alabama' },
  //     { short: 'AK', name: 'Alaska' },
  //     { short: 'AZ', name: 'Arizona' },
  //     { short: 'AR', name: 'Arkansas' },
  //     { short: 'CA', name: 'California' },
  //     { short: 'CO', name: 'Colorado' },
  //     { short: 'CT', name: 'Connecticut' },
  //     { short: 'DE', name: 'Delaware' },
  //     { short: 'FL', name: 'Florida' },
  //     { short: 'GA', name: 'Georgia' },
  //     { short: 'HI', name: 'Hawaii' },
  //     { short: 'ID', name: 'Idaho' },
  //     { short: 'IL', name: 'Illinois' },
  //     { short: 'IN', name: 'Indiana' },
  //     { short: 'IA', name: 'Iowa' },
  //     { short: 'KS', name: 'Kansas' },
  //     { short: 'KY', name: 'Kentucky' },
  //     { short: 'LA', name: 'Louisiana' },
  //     { short: 'ME', name: 'Maine' },
  //     { short: 'MD', name: 'Maryland' },
  //     { short: 'MA', name: 'Massachusetts' },
  //     { short: 'MI', name: 'Michigan' },
  //     { short: 'MN', name: 'Minnesota' },
  //     { short: 'MS', name: 'Mississippi' },
  //     { short: 'MO', name: 'Missouri' },
  //     { short: 'MT', name: 'Montana' },
  //     { short: 'NE', name: 'Nebraska' },
  //     { short: 'NV', name: 'Nevada' },
  //     { short: 'NH', name: 'New Hampshire' },
  //     { short: 'NJ', name: 'New Jersey' },
  //     { short: 'NM', name: 'New Mexico' },
  //     { short: 'NY', name: 'New York' },
  //     { short: 'NC', name: 'North Carolina' },
  //     { short: 'ND', name: 'North Dakota' },
  //     { short: 'OH', name: 'Ohio' },
  //     { short: 'OK', name: 'Oklahoma' },
  //     { short: 'OR', name: 'Oregon' },
  //     { short: 'PA', name: 'Pennsylvania' },
  //     { short: 'RI', name: 'Rhode Island' },
  //     { short: 'SC', name: 'South Carolina' },
  //     { short: 'SD', name: 'South Dakota' },
  //     { short: 'TN', name: 'Tennessee' },
  //     { short: 'TX', name: 'Texas' },
  //     { short: 'UT', name: 'Utah' },
  //     { short: 'VT', name: 'Vermont' },
  //     { short: 'VA', name: 'Virginia' },
  //     { short: 'WA', name: 'Washington' },
  //     { short: 'WV', name: 'West Virginia' },
  //     { short: 'WI', name: 'Wisconsin' },
  //     { short: 'WY', name: 'Wyoming' }
  //   ];

  //   for (const asshole of obj) {
  //     const record = this.statesRepository.create({
  //       name: asshole.name,
  //       short: asshole.short,
  //     });

  //     const result = await this.statesRepository.save(record);
  //   }
  // }

  async createClub(clubDetails: CreateClubParams) {
    try {
      // Put this in the validation logic instead
      const state = await this.statesRepository.findOneByOrFail({
        short: clubDetails.state,
      });

      const address = this.addressRepository.create({
        street: clubDetails.street,
        city: clubDetails.city,
        state,
      });
      await this.addressRepository.save(address);
      const newClub = this.clubRepository.create({
        title: clubDetails.title,
        address: address,
        description: clubDetails.description,
        // Fix
        clubCategory: ClubCategory.City,
        image: clubDetails.image,
      });

      // async call. should be awaited
      const result = await this.clubRepository.save(newClub);
      return result;
    } catch (e) {
      console.log('e');
    }
  }
}

  // updateUser(id: number, userDetails: UpdateUserParams) {
  //   return this.clubRepository.update(
  //     {
  //       id,
  //     },
  //     { ...userDetails },
  //   );
  // }

  // deleteUser(id: number) {
  //   return this.clubRepository.delete({ id });
  // }

  // async createUserProfile(
  //   id: number,
  //   createUserProfileDetails: CreateUserProfileParams,
  // ) {
  //   const user = await this.clubRepository.findOneBy({ id });

  //   if (!user) {
  //     throw new HttpException(
  //       'User not found. Cannot create Profile',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const newProfile = this.clubRepository.create(createUserProfileDetails);
  //   const savedProfile = await this.clubRepository.save(newProfile);
  //   user.profile = savedProfile;
  //   return this.clubRepository.save(user);
  // }

